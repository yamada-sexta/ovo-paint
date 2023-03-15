import {ShapePaintTool} from "./ShapePaintTool";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {TextShape} from "./Shape/TextShape";
import {br, div, iconBtn, input, label} from "../../UI/DOM/DOMFunctions";
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

    default = {
        content: "Edit Text in Context Menu",
        font: "Roboto",
        fontSize: 20,
    }
    getMenu(): HTMLElement {
        // if (!this.selectedShape) return div();
        if (!this.selectedShape && this.hoveredShape) {
            this.selectedShape = this.hoveredShape;
        }
        let textShape = this.selectedShape;
        const createNewShape = () => {
            const newShape = new TextShape(this.default.content, this.pointerPos, font.value, sizeVal);
            newShape.content = textInput.value;
            newShape.font = font.value;
            newShape.fontSize = sizeVal;
            newShape.updateSize();
            if (this.node) {
                this.node.addShape(newShape);
            }
            this.selectedShape = newShape;
        }

        const updateShape = () => {
            if (textShape instanceof TextShape) {
                textShape.content = textInput.value;
                textShape.font = font.value;
                textShape.fontSize = sizeVal;
                textShape.updateSize();
            }
        }
        let frame = div();
        let textInput = input();
        textInput.type = "text";
        textInput.placeholder = "Your Text";

        frame.appendChild(label({
            text: "Text",
            children: [textInput],
        }));
        frame.append(br());
        let font = input();
        font.type = "text";
        font.placeholder = "Font";
        font.onchange = () => {
            updateShape();
        }
        frame.appendChild(label({
            text: "Font",
            children: [font],
        }));
        frame.append(br());
        let sizeVal = this.default.fontSize;
        if (textShape instanceof TextShape) {
            textInput.value = textShape.content;
            font.value = textShape.font;
            sizeVal = textShape.fontSize;
        } else {
            textInput.value = "";
            font.value = this.default.font;
        }
        let size = draggableNum({
            onchange: (val) => {
                if (textShape instanceof TextShape) {
                    sizeVal = val;
                    updateShape();
                }
            },
            value: sizeVal,
        });
        frame.appendChild(label({
            text: "Font Size: ",
            children: [size],
        }));
        frame.append(br());
        if (textShape instanceof TextShape) {
            const saveBtn = iconBtn(
                "check",
                "Save",
                () => {
                    if (textInput.value === "") return;
                    if (font.value === "") return;
                    if (!(textShape instanceof TextShape)) {

                    } else {
                        textShape.content = textInput.value;
                        textShape.font = font.value;
                        textShape.fontSize = sizeVal;
                        textShape.updateSize();
                    }
                    closeDocContextMenu();
                }
            )
            frame.appendChild(saveBtn);
            const deleteBtn = iconBtn(
                "Delete",
                "Delete",
                () => {
                    if (this.node && this.selectedShape) {
                        this.node.removeShape(this.selectedShape);
                    }
                    closeDocContextMenu();
                }
            )
            frame.appendChild(deleteBtn);

        } else {
            const createBtn = iconBtn(
                "check",
                "Create",
                () => {
                    if (textInput.value === "") return;
                    if (font.value === "") return;
                    createNewShape();
                    closeDocContextMenu();
                }
            )
            frame.appendChild(createBtn);
        }

        return frame;
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>) {
        await super.onDown(e);
        if (!(this.selectedShape)) {
            this.node = e.node;
            this.pointerPos = e.pos;
            let shape = new TextShape(this.default.content, this.pointerPos, this.default.font, this.default.fontSize);
            this.node.addShape(shape);
            return;
        }
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
