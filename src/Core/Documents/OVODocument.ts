import {currUser, User} from "./Security/User";
import {DocNode} from "./DocNodes/DocNode";
import {GroupNode} from "./DocNodes/GroupNode";
import {IOperation} from "../Interface/IOperation";
import {IFileWrapper} from "../submodules/common-ts-utils/Files/Interface/IFileWrapper";
import {DocSerializer} from "./Serializers/DocSerializer";
import {OvoJsonSerializer} from "./Serializers/OvoJsonSerializer";
import {
    SystemFileAccessFileGetter
} from "../submodules/common-ts-utils/Files/SystemFileAccess/SystemFileAccessFileGetter";

type DocumentRenderMode = "export" | "edit";

export interface DocumentRenderOptions {
    renderMode: DocumentRenderMode;
}

export interface DocumentModifyInfo {
    modifiedBy: User;
    modified: boolean;
}

export interface DocumentCache {
    background: CanvasImageSource;
    foreground: CanvasImageSource;
}

type docEventKey = "changeActiveNode"

export class OVODocument {
    public name: string;

    _activeNode: DocNode;

    _events: { [key: string]: (() => Promise<void>)[] } = {};
    modifyInfo: DocumentModifyInfo;
    background: "white" | "black" | "transparent";
    protected _history: IOperation[] = [];
    protected _current: IOperation;
    protected _redoStack: IOperation[] = [];
    protected readonly _canvas: OffscreenCanvas;
    protected readonly _ctx: OffscreenCanvasRenderingContext2D;

    saveFileHandle: IFileWrapper | null = null;

    saveSerializer: DocSerializer = new OvoJsonSerializer();

    constructor(name: string,
                width: number, height: number,
                root: GroupNode = new GroupNode("root"),
                modifyInfo: DocumentModifyInfo = {
                    modified: false,
                    modifiedBy: currUser
                }) {
        this.name = name;
        this._canvas = new OffscreenCanvas(width, height);
        this._ctx = this._canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        if (!this._ctx) {
            throw new Error("Failed to create OffscreenCanvasRenderingContext2D");
        }
        this.modifyInfo = modifyInfo;
        this.background = "transparent";
        this._rootNode = root;
        this._activeNode = this._rootNode;

        this._current = {
            do(): void {
                console.log("No operation to do")
            }
        }
    }

    undo(): void {
        console.log("undo", this._history)
        console.log("redo", this._redoStack)
        if (this._history.length === 0) {
            console.log(`No history in document ${this.name}`)
            return;
        }
        this._redoStack.push(this._current);
        this._current.do();
        this._current = this._history.pop() as IOperation;
    }

    redo(): void {
        if (this._redoStack.length === 0) {
            console.log(`No redo in document ${this.name}`)
            return;
        }
        console.log(this._history)
        console.log(this._redoStack)
        let last = this._redoStack.pop();
        if (last) {
            last.do();
            this._history.push(last);
        }
    }

    shiftSnapshot(): void {
        if (this._history.length > 0) {
            this._history.shift();
        } else {
            console.log(`No history in document ${this.name}`)
        }
    }

    get width(): number {
        return this._canvas.width;
    }

    get height(): number {
        return this._canvas.height;
    }

    get canvas(): OffscreenCanvas {
        return this._canvas;
    }

    protected _rootNode: GroupNode;

    get rootNode(): GroupNode {
        return this._rootNode;
    }


    get activeNode(): DocNode {
        return this._activeNode;
    }

    set activeNode(value: DocNode) {
        this.trigger("changeActiveNode");
        this._activeNode = value;
    }

    get content(): CanvasImageSource {
        return this._canvas;
    }

    trigger(key: docEventKey) {
        if (this._events[key]) {
            for (let callback of this._events[key]) {
                (async () => {
                    await callback();
                })();
            }
        }
    }

    removeNode(node: DocNode) {
        function deleteNode(parent: GroupNode, node: DocNode) {
            for (let i = 0; i < parent.children.length; i++) {
                if (parent.children[i] === node) {
                    parent.children.splice(i, 1);
                    return;
                }
                if (parent.children[i] instanceof GroupNode) {
                    deleteNode(parent.children[i] as GroupNode, node);
                }
            }
        }

        deleteNode(this._rootNode, node);
    }

    renderExport(): void {
        this.drawBackgroundImage();
        this._rootNode.render({
            activeNode: this._activeNode,
            reachActiveLayer: false,
            renderMode: "export",
            canvas: this._canvas,
            ctx: this._ctx
        });
    }

    renderEdit(): void {
        this.drawBackgroundImage();
        this._rootNode.render({
            activeNode: this._activeNode,
            reachActiveLayer: false,
            renderMode: "edit",
            canvas: this._canvas,
            ctx: this._ctx
        });
    }

    render(e: DocumentRenderOptions): void {
        switch (e.renderMode) {
            case "export":
                this.renderExport();
                break;
            case "edit":
                this.renderEdit();
                break;
        }
    }

    drawBackgroundImage(): void {
        if (this.background === "transparent") {
            this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
        } else {
            this._ctx.fillStyle = this.background;
            this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
        }
    }

    pushChange(change: IOperation): void {
        if (this._current) {
            this._history.push(this._current);
        }
        this._current = change;
    }

    async saveAs(fileHandle: IFileWrapper): Promise<void> {
        const blob = await this.saveSerializer.toBlob(this);
        if (!blob) {
            return Promise.reject("Failed to serialize");
        }
        await fileHandle.save(blob);
    }

    async save(): Promise<void> {
        if (this.saveFileHandle) {
            return this.saveAs(this.saveFileHandle);
        } else {
            const fileGetter = new SystemFileAccessFileGetter();
            const fileHandle = await fileGetter.showSaveDialog({
                types: [
                    {
                        description: "OVO Document",
                        accept: {
                            "application/json": [".ovojson"]
                        }
                    }
                ]
            });
            if (fileHandle) {
                this.saveFileHandle = fileHandle;
                return this.saveAs(fileHandle);
            }
            else {
                return Promise.reject("No file handle");
            }

        }
    }
}
