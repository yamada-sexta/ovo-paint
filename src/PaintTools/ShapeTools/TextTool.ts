import {ShapePaintTool} from "./ShapePaintTool";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {TextShape} from "./Shape/TextShape";
import {br, div, input, label} from "../../UI/DOM/DOMFunctions";
import {Shape} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";
import {PaintToolUIRenderEvent} from "../PaintTool";
import {currentTheme} from "../../UI/Themes";
import {closeDocContextMenu} from "../../UI/DocUI/DocContextMenu/MasterDocContextMenu";
import {OVODocument} from "../../core/src/Documents/OVODocument";
import {draggableNum} from "../../UI/DOM/DraggableNum";

export class TextTool extends ShapePaintTool {
    pointerPos: Vec2 = [0, 0];

    node: ShapeLayerNode | null = null;

    getMenu(): HTMLElement {
        // if (!this.selectedShape) return div();
        let textShape = this.selectedShape;
        if (!textShape) {
            textShape = new TextShape("", this.pointerPos, "Arial", 20);
        }
        let frame = div();
        let textInput = input();
        textInput.type = "text";
        textInput.placeholder = "Text";

        frame.appendChild(label({
            text: "Text",
            children: [textInput],
        }));
        frame.append(br());
        let font = input();
        font.type = "text";
        font.placeholder = "Font";
        frame.appendChild(label({
            text: "Font",
            children: [font],
        }));
        frame.append(br());
        let sizeVal = 20;
        if (textShape instanceof TextShape) {
            textInput.value = textShape.content;

            font.value = textShape.font;
            sizeVal = textShape.fontSize;
        }
        let size = draggableNum({
            onchange: (val) => {
                if (textShape instanceof TextShape) {
                    textShape.fontSize = val;
                    textShape.updateSize();
                    sizeVal = val;
                }
            },
            value: sizeVal,
        });
        frame.appendChild(label({
            text: "Font Size: ",
            children: [size],
        }));
        frame.append(br());
        let button = document.createElement("button");

        if (this.selectedShape) {
            button.innerText = "Save";
            button.onclick = () => {
                if (textInput.value === "") return;
                if (font.value === "") return;
                if (!(textShape instanceof TextShape)) {
                    throw new Error("TextShape is not a TextShape");
                }
                textShape.content = textInput.value;
                textShape.font = font.value;
                textShape.fontSize = sizeVal;
                textShape.updateSize();
                closeDocContextMenu();
            }
        } else if (this.node !== null) {
            button.innerText = "Create";
            button.onclick = () => {
                if (textInput.value === "") return;
                if (font.value === "") return;
                let shape = new TextShape("Text", this.pointerPos, font.value, sizeVal);
                shape.content = textInput.value;
                if (this.node === null) throw new Error("Node is null");
                this.node.addShape(shape);
                closeDocContextMenu();
            }
        }

        frame.appendChild(button);
        return frame;
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onDown(e);
        if (!(this.selectedShape)) {
            this.node = e.node;
            this.pointerPos = e.pos;
            return;
        }
        if (!(this.selectedShape instanceof TextShape)) return;
    }

    drawSelfUI(e: PaintToolUIRenderEvent) {
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
    }

    drawSelectedShapeUI(e: PaintToolUIRenderEvent, shape: Shape) {
        // super.drawSelectedShapeUI(e, shape);
        if (!(shape instanceof TextShape)) return;
        const ctx = e.ctx;
        ctx.strokeStyle = currentTheme.primary;
        // console.log(shape.position, shape.width, shape.height);
        ctx.strokeRect(shape.position[0], shape.position[1] - shape.height, shape.width, shape.height);
    }

    async onMove(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onMove(e);
        this.pointerPos = e.pos;
        this.node = e.node;
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

    async onSelect(e: { node: ShapeLayerNode, doc: OVODocument }): Promise<void> {
        // return super.onSelect(e);
        this.node = e.node;
    }
}
