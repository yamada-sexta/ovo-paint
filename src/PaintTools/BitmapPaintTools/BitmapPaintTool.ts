import {PaintTool} from "../PaintTool";
import {BitmapLayerNode} from "../../Core/Documents/DocNodes/Layers/BitmapLayerNode";
import {DocNode} from "../../Core/Documents/DocNodes/DocNode";

export abstract class BitmapPaintTool extends PaintTool<BitmapLayerNode> {
    isCompatibleWithNode(node: DocNode): boolean {
        return node instanceof BitmapLayerNode;
    }
}
