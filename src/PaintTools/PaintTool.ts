import {PaintToolEvent} from "../core/src/PaintToolEvent";
import {DocNode} from "../core/src/Documents/DocNodes/DocNode";

export abstract class PaintTool<NodeType extends DocNode> {
    onDown(e: PaintToolEvent<NodeType>): void {

    }

    onMove(e: PaintToolEvent<NodeType>): void {

    }

    onUp(e: PaintToolEvent<NodeType>): void {

    }
}
