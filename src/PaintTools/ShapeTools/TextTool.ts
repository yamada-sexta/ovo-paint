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

// @registerPaintTool
export class TextTool extends ShapePaintTool {
    private downRelaPos: Vec2 | null = null;

    // private selectedShape: TextShape | null = null;

    getMenu(): HTMLElement {
        // if (!this.selectedShape) return div();
        let frame = div();
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Text";
        frame.appendChild(input);
        frame.append(br());
        let font = document.createElement("input");
        font.type = "text";
        font.placeholder = "Font";
        frame.appendChild(font);
        frame.append(br());
        let size = document.createElement("input");
        size.type = "number";
        size.placeholder = "Size";
        frame.appendChild(size);
        frame.append(br());
        let button = document.createElement("button");
        button.innerText = "Save";
        button.onclick = () => {
            if (input.value === "") return;
            if (font.value === "") return;
            if (size.value === "") return;
            // this.selectedShape!.content = input.value;
            // this.selectedShape!.font = font.value;
            // this.selectedShape!.fontSize = parseInt(size.value);
        }
        frame.appendChild(button);
        return frame;
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onDown(e);

        if (!(this.selectedShape)) {
            console.log("Creating new text shape");
            let shape = new TextShape("Text", e.pos, "Source Han JP", 20);
            shape.position = e.pos;
            e.node.addShape(shape);
        }

        // if (!(e.doc.activeNode instanceof ShapeLayerNode)) {
        //     return;
        // }
        // const node = e.node;
        //
        // const pos = e.pos;
        // let shape = this.getShape(e);
        // if (shape !== null) {
        //     if (!(shape instanceof TextShape)) return;
        //     // if (e.button === 1) {
        //     //     e.node.removeShape(shape);
        //     //     return;
        //     // }
        //     // if (e.button === 0) {
        //     //     shape.renderUI(e.ui.ctx);
        //     //     this.selectedShape = shape;
        //     //     this.downRelaPos = [pos[0] - shape.position[0], pos[1] - shape.position[1]];
        //     // }
        //     // if (e.button === 2) {
        //     //     const text = prompt("Text", shape.content);
        //     //     if (text === null) return;
        //     //     const font = prompt("Font", shape.font);
        //     //     if (font === null) return;
        //     //     const size = prompt("Size", shape.fontSize.toString());
        //     //     if (size === null) return;
        //     //     shape.font = font;
        //     //     shape.fontSize = parseInt(size);
        //     //
        //     //     shape.content = text;
        //     // }
        // } else {
        //     const text = prompt("Text", "Your Text Here");
        //     if (text === null) return;
        //     const font = prompt("Font", "Arial");
        //     if (font === null) return;
        //     const size = prompt("Size", "20");
        //     if (size === null) return;
        //     const textNode = new TextShape(text, pos, font, parseInt(size));
        //     node.addShape(textNode);
        // }
    }


    async onMove(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onMove(e);
        // if (!(e.node instanceof ShapeLayerNode)) {
        //     return;
        // }

        // if (this.selectedShape !== null) {
        //     // this.selectedShape.renderUI(e.ui.ctx);
        //     const pos = e.pos;
        //     // this.selectedShape.position = [pos[0] - this.downRelaPos![0], pos[1] - this.downRelaPos![1]];
        // } else {
        //     e.ui.ctx.clearRect(0, 0, e.ui.canvas.width, e.ui.canvas.height);
        //     const currShape = this.getShape(e);
        //     if (currShape !== null) {
        //         if (!(currShape instanceof TextShape)) return;
        //         currShape.renderUI(e.ui.ctx);
        //     }
        // }
    }

    async onUp(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onUp(e);
        // e.ui.ctx.clearRect(0, 0, e.ui.canvas.width, e.ui.canvas.height);
        // this.downPos = null;
        this.selectedShape = null;
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
