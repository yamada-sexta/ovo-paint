import {PaintToolEvent} from "../core/src/PaintToolEvent";
import {DocNode} from "../core/src/Documents/DocNodes/DocNode";
import {OVOState} from "../UI/DocUI/DocCanvasState";
import {checkShortcut, IShortcut} from "../Shortcuts/ShortcutsChecker";

export interface PaintToolUIRenderEvent {
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    canvas: HTMLCanvasElement | OffscreenCanvas;
    state: OVOState;
    dom: HTMLElement | null;
    inDocRange: boolean;
}

export interface PaintToolUIKey extends IShortcut {
    pos: { x: number, y: number };
}

export abstract class PaintTool<NodeType extends DocNode = DocNode> {

    getMenu(): HTMLElement {
        let item = document.createElement("div");
        item.innerText = "NO CONTENT";
        return item;
    }

    abstract isCompatibleWithNode(node: DocNode): boolean;


    async onDown(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    async onMove(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    async onUp(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {

    }

    async onKeyDown(e: IShortcut): Promise<void> {

    }

    async onKeyUp(e: IShortcut): Promise<void> {

    }

    async onKeyPress(e: IShortcut): Promise<void> {

    }
}
