import {DocNode, DocNodeRenderEvent} from "../DocNode";

export class ScriptableLayerNode extends DocNode{
    protected _script: string = "";
    redo(): void {
    }

    set script(script: string) {
        this._script = script;
    }

    get script(): string {
        return this._script;
    }

    render(e: DocNodeRenderEvent): void {
    }

    undo(): void {
    }

}