import {ShapePaintTool} from "./ShapePaintTool";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";
import {Shape} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {SimpleShape, SimpleShapeType} from "./Shape/SimpleShape";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {br, colorPicker, div, text} from "../../UI/DOM/DOMFunctions";
import {PaintToolUIRenderEvent} from "../PaintTool";
import {currentTheme} from "../../UI/Themes";
import {draggableNum} from "../../UI/DOM/DraggableNum";

export class SimpleShapeTool extends ShapePaintTool {
    newShape: SimpleShape | null = null;
    startPos: Vec2 | null = null;
    shapeType: SimpleShapeType = "rectangle";
    lineWidth: number = 1;
    fillStyle: string = "#fff";
    strokeStyle: string = "#000";

    shapeInRange(shape: Shape, pos: Vec2): boolean {
        if (!(shape instanceof SimpleShape)) return false;
        const {pos: shapePos, size: shapeSize} = shape;
        const minX = Math.min(shapePos[0], shapePos[0] + shapeSize[0]);
        const maxX = Math.max(shapePos[0], shapePos[0] + shapeSize[0]);
        const minY = Math.min(shapePos[1], shapePos[1] + shapeSize[1]);
        const maxY = Math.max(shapePos[1], shapePos[1] + shapeSize[1]);
        return pos[0] >= minX && pos[0] <= maxX && pos[1] >= minY && pos[1] <= maxY;
    }

    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {
        await super.renderCanvasUI(e);

        if (this.newShape !== null) {
            console.log("rendering new shape");
            if (e.dom) {
                e.dom.style.cursor = "crosshair";
            }
        }
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onDown(e);
        if (this.selectedShape) {
            return;
        }
        this.startPos = e.pos;
        this.newShape = new SimpleShape(e.pos, [0, 0], this.shapeType, this.fillStyle, this.strokeStyle, this.lineWidth);
        e.node.shapes.push(this.newShape);
    }

    async onMove(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onMove(e);
        if (!this.startPos) return;
        if (this.newShape && this.startPos) {
            this.newShape.size = [e.pos[0] - this.startPos[0], e.pos[1] - this.startPos[1]];
        }
    }

    async onUp(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onUp(e);
        this.startPos = null;
        this.newShape = null;
    }

    getMenu(): HTMLElement {
        const menu = div();
        const shapeTypeSelect = document.createElement("select");
        shapeTypeSelect.innerHTML = `
            <option value="rectangle">Rectangle</option>
            <option value="ellipse">Ellipse</option>
            <option value="line">Line</option>
            <option value="star">Star</option>
            <option value="circle">Circle</option>
            <option value="triangle">Triangle</option>
        `;
        shapeTypeSelect.onchange = () => {
            this.shapeType = shapeTypeSelect.value as SimpleShapeType;
        }
        shapeTypeSelect.value = this.shapeType;
        const shapeTypeLabel = text("Shape Type: ");
        shapeTypeLabel.append(shapeTypeSelect)
        menu.appendChild(shapeTypeLabel);
        menu.append(br());

        const lineWithInput = draggableNum({
            onchange: (val) => {
                this.lineWidth = val;

            },
            value: this.lineWidth,
        });
        const lineWidthLabel = text("Line Width: ");
        lineWidthLabel.append(lineWithInput);
        menu.appendChild(lineWidthLabel);
        menu.append(br());

        const fillStyleInput = colorPicker({
            onchange: (e) => {
                this.fillStyle = fillStyleInput.value;
            }
        })
        fillStyleInput.value = this.fillStyle;
        const fillStyleLabel = text("Fill Style: ");
        fillStyleLabel.append(fillStyleInput);
        menu.appendChild(fillStyleLabel);
        menu.append(br());

        const strokeStyleInput = colorPicker({
            onchange: (e) => {
                this.strokeStyle = strokeStyleInput.value;
            }
        })
        strokeStyleInput.value = this.strokeStyle;
        const strokeStyleLabel = text("Stroke Style: ");
        strokeStyleLabel.append(strokeStyleInput);
        menu.appendChild(strokeStyleLabel);
        menu.append(br());

        return menu;
    }

    drawHoveredShapeUI(e: PaintToolUIRenderEvent, shape: Shape) {
        // super.drawHoveredShapeUI(e, shape);
        if (!(shape instanceof SimpleShape)) return;
        const {pos, size} = shape;
        e.ctx.strokeStyle = currentTheme.hover;
        e.ctx.strokeRect(pos[0], pos[1], size[0], size[1]);
    }

    drawSelectedShapeUI(e: PaintToolUIRenderEvent, shape: Shape) {
        // super.drawSelectedShapeUI(e, shape);
        if (!(shape instanceof SimpleShape)) return;
        const {pos, size} = shape;
        e.ctx.strokeStyle = currentTheme.selected;
        e.ctx.strokeRect(pos[0], pos[1], size[0], size[1]);
    }
}
