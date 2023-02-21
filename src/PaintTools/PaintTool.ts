import {PaintToolEvent} from "../core/src/PaintToolEvent";
import {DocNode} from "../core/src/Documents/DocNodes/DocNode";

export abstract class PaintTool<NodeType extends DocNode = DocNode> {

    getMenu(): HTMLElement {
        let item = document.createElement("div");
        item.innerText = "NO CONTENT";
        return item;
    }


    onDown(e: PaintToolEvent<NodeType>): void {

    }

    onMove(e: PaintToolEvent<NodeType>): void {

    }

    onUp(e: PaintToolEvent<NodeType>): void {

    }
}
