import {PaintTool} from "../PaintTool";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";

export abstract class BitmapPaintTool extends PaintTool<BitmapLayerNode> {
    checkNode(node: DocNode): boolean {
        return node instanceof BitmapLayerNode;
    }
}
