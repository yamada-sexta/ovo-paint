import {PaintTool} from "../PaintTool";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {Shape} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";

export abstract class ShapePaintTool extends PaintTool<ShapeLayerNode> {
    selectedShape: Shape | null = null;
    hoveredShape: Shape | null = null;

    isCompatibleWithNode(node: DocNode): boolean {
        return node instanceof ShapeLayerNode;
    }

    /**
     * Returns true if the shape is compatible with the tool and is in range of the given position
     * @param shape
     * @param pos
     */
    abstract shapeInRange(shape: Shape, pos: Vec2): boolean;

    async onMove(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onMove(e);
        this.hoveredShape = this.getShape(e);
        if (this.hoveredShape) {
            this.drawHoveredShapeUI(e, this.hoveredShape);
        }
    }

    async onUp(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onUp(e);
        this.selectedShape = null;
    }

    getShape(e: PaintToolEvent<ShapeLayerNode>): Shape | null {
        for (const shape of e.node.shapes) {
            if (this.shapeInRange(shape, e.pos)) {
                return shape;
            }
        }
        return null;
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onDown(e);
        this.selectedShape = this.getShape(e);
        if (this.selectedShape) {
            this.drawSelectedShapeUI(e, this.selectedShape);
        }
    }

    drawSelectedShapeUI(e: PaintToolEvent<ShapeLayerNode>, shape: Shape): void {

    }

    drawHoveredShapeUI(e: PaintToolEvent<ShapeLayerNode>, shape: Shape): void {

    }

    drawThisUI(e: PaintToolEvent<ShapeLayerNode>): void {

    }

}
