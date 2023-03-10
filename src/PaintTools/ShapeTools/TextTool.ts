import {ShapePaintTool} from "./ShapePaintTool";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {TextShape} from "./Shape/TextShape";
import {br, div} from "../../UI/DOM/DOMFunctions";
import {registerPaintTool} from "../PaintTools";
import {Shape} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";
import {PaintToolUIRenderEvent} from "../PaintTool";
import {currentTheme} from "../../UI/Themes";
import {closeDocContextMenu} from "../../UI/DocUI/DocContextMenu/MasterDocContextMenu";

// @registerPaintTool
export class TextTool extends ShapePaintTool {
    // private downRelaPos: Vec2 | null = null;

    // private selectedShape: TextShape | null = null;

    // internalTextShape: TextShape = new TextShape("Hello World", [0,0],"Arial", 20);

    getMenu(): HTMLElement {
        if (!this.selectedShape) return div();

        const textShape = this.selectedShape as TextShape;

        let frame = div();
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Text";
        input.value = textShape.content;
        frame.appendChild(input);
        frame.append(br());
        let font = document.createElement("input");
        font.type = "text";
        font.placeholder = "Font";
        font.value = textShape.font;
        frame.appendChild(font);
        frame.append(br());
        let size = document.createElement("input");
        size.type = "number";
        size.placeholder = "Size";
        size.value = textShape.fontSize.toString();
        frame.appendChild(size);
        frame.append(br());
        let button = document.createElement("button");
        button.innerText = "Save";
        button.onclick = () => {
            if (input.value === "") return;
            if (font.value === "") return;
            if (size.value === "") return;
            textShape.content = input.value;
            textShape.font = font.value;
            textShape.fontSize = parseInt(size.value);
            textShape.updateSize();
            this.selectedShape = null;
            closeDocContextMenu();
        }
        frame.appendChild(button);
        return frame;
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onDown(e);
        if (!(this.selectedShape)) {
            console.log("Creating new text shape");
            let shape = new TextShape("Text", e.pos, "Climate Crisis", 20);
            shape.position = e.pos;
            e.node.addShape(shape);
            return;
        }
        if (!(this.selectedShape instanceof TextShape)) return;
        // this.internalTextShape = this.selectedShape;

    }


    async onMove(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onMove(e);
    }

    async onUp(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onUp(e);
        // e.ui.ctx.clearRect(0, 0, e.ui.canvas.width, e.ui.canvas.height);
        // this.downPos = null;
        // this.selectedShape = null;
    }

    isCompatibleWithShape(shape: Shape): boolean {
        return shape instanceof TextShape;
    }

    shapeCompatible(shape: Shape): boolean {
        return false;
    }

    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {
        await super.renderCanvasUI(e);
        if (e.dom) {
            e.dom.style.cursor = "text";
        }
    }

    drawHoveredShapeUI(e: PaintToolUIRenderEvent, shape: Shape) {
        if (!(shape instanceof TextShape)) return;
        const ctx = e.ctx;
        ctx.strokeStyle = currentTheme.hover;
        // console.log(shape.position, shape.width, shape.height);
        ctx.strokeRect(shape.position[0], shape.position[1] - shape.height, shape.width, shape.height);
        // console.log("drawing");
    }

    drawSelectedShapeUI(e: PaintToolUIRenderEvent, shape: Shape) {
        // super.drawSelectedShapeUI(e, shape);
        if (!(shape instanceof TextShape)) return;
        const ctx = e.ctx;
        ctx.strokeStyle = currentTheme.primary;
        // console.log(shape.position, shape.width, shape.height);
        ctx.strokeRect(shape.position[0], shape.position[1] - shape.height, shape.width, shape.height);
    }

    shapeInRange(shape: Shape, pos: Vec2): boolean {
        if (!(shape instanceof TextShape)) return false;

        const shapePos = shape.position;
        const shapeWidth = shape.width;
        const shapeHeight = shape.height;

        const minY = shapePos[1] - shapeHeight;
        const maxY = shapePos[1];

        const minX = shapePos[0];
        const maxX = shapePos[0] + shapeWidth;

        return pos[0] >= minX && pos[0] <= maxX && pos[1] >= minY && pos[1] <= maxY;
    }
}
