import {PaintTool} from "../PaintTool";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";

export abstract class ShapePaintTool extends PaintTool<ShapeLayerNode> {
    checkNode(node: DocNode): boolean {
        return node instanceof ShapeLayerNode;
    }
}
