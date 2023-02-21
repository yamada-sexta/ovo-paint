import {PaintToolEvent} from "../core/src/PaintToolEvent";
import {DocNode} from "../core/src/Documents/DocNodes/DocNode";

export abstract class PaintTool<NodeType extends DocNode = DocNode> {

    getMenu(): HTMLElement {
        let item = document.createElement("div");
        item.innerText = "NO CONTENT";
        return item;
    }


    async onDown(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    async onMove(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    async onUp(e: PaintToolEvent<NodeType>): Promise<void> {

    }
}
