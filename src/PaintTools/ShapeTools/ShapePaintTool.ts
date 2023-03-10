import {PaintTool, PaintToolUIRenderEvent} from "../PaintTool";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {Shape} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";

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


    async onDown(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onDown(e);
        this.selectedShape = this.getShape(e);
    }

    async onMove(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onMove(e);
        this.hoveredShape = this.getShape(e);
    }

    async onUp(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onUp(e);
        // this.selectedShape = null;
    }

    getShape(e: PaintToolEvent<ShapeLayerNode>): Shape | null {
        for (const shape of e.node.shapes) {
            if (this.shapeInRange(shape, e.pos)) {
                return shape;
            }
        }
        return null;
    }

    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {
        await super.renderCanvasUI(e);
        if (this.selectedShape) {
            this.drawSelectedShapeUI(e, this.selectedShape);
        }
        if (this.hoveredShape) {
            this.drawHoveredShapeUI(e, this.hoveredShape);
        }
        this.drawSelfUI(e);
    }

    drawSelectedShapeUI(e: PaintToolUIRenderEvent, shape: Shape): void {
        // throw new Error("Method not implemented.");
    }

    drawHoveredShapeUI(e: PaintToolUIRenderEvent, shape: Shape): void {
        // throw new Error("Method not implemented.");
    }

    drawSelfUI(e: PaintToolUIRenderEvent): void {

    }

}
