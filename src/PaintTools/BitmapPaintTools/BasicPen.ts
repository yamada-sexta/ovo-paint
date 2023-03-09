import {BitmapPaintTool} from "./BitmapPaintTool";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {drawHermitCurve} from "../../core/src/submodules/common-ts-utils/Canvas/PaintCanvas";
import {br, div, input, text} from "../../UI/DOM/DOMFunctions";
import {PaintToolUIRenderEvent} from "../PaintTool";
import {checkShortcut} from "../../Shortcuts/ShortcutsChecker";
import {registerPaintTool} from "../PaintTools";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";
import {draggableNum} from "../../UI/DOM/DraggableNum";

// @registerPaintTool
export class BasicPen extends BitmapPaintTool {
    // isDrawing: boolean = false;

    lastPoints: Vec2[] = [];

    maxSize: number = 20;
    minSize: number = 5;

    color: string = "#000000";

    _pointerPos: Vec2 = [0, 0];
    _pointerPressure: number = 0;

    currEvent: "draw" | "resize" | "none" = "none";

    _downPos: Vec2 | null = null;

    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {
        if (!e.inDocRange) {
            if (e.dom) {
                e.dom.style.cursor = "default";

            }
            return
        }
        let pos = this._pointerPos;
        e.ctx.strokeStyle = "#969696";
        e.ctx.lineWidth = 1 / e.state.doc.scale * e.state.viewer.scale;
        e.ctx.beginPath();
        let size = this.getSize(1) / 2;
        if (this._pointerPressure > 0 && this.currEvent == "draw") {
            size = this.getSize(this._pointerPressure) / 2;
        }
        if (this.currEvent == "resize") {
            if (this._downPos) {
                // set pos to the center
                let x = this._downPos[0] + (pos[0] - this._downPos[0]) / 2;
                let y = this._downPos[1] + (pos[1] - this._downPos[1]) / 2;
                e.ctx.arc(x, y, size, 0, 2 * Math.PI);
                e.ctx.stroke();
            }
        } else {
            //Draw a circle at the current mouse position
            e.ctx.arc(pos[0], pos[1], size, 0, 2 * Math.PI);
            e.ctx.stroke();
        }
        if (e.dom) {
            if (e.inDocRange) {
                e.dom.style.cursor = "none";
            }
        }
    }

    getSize(pressure: number): number {
        return (this.maxSize - this.minSize) * pressure + this.minSize;
    }

    getMenu(): HTMLElement {
        let frame = div();
        frame.append(text("size: "))
        // const txt = text(this.maxSize + "");
        // txt.draggable = true;
        let dragStartPos = [0, 0];
        const draggable = draggableNum(
            {
                value: this.maxSize,
                onchange: (val) => {
                    this.maxSize = val;
                }
            }
        )
        frame.append(draggable)
        frame.append(br())
        frame.append(text("color: "))
        let colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.oninput = () => {
            this.color = colorPicker.value;
        }
        colorPicker.value = this.color;
        frame.appendChild(colorPicker);
        return frame;
    }

    async onDown(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onDown(e);
        this._downPos = e.pos;
        if (checkShortcut("resizePen", {
            ctrlKey: e.key.ctrl,
            shiftKey: e.key.shift,
            altKey: e.key.alt,
            key: ""
        })) {
            this.currEvent = "resize";
            // console.log("resize")
        } else {
            e.node.createSnapshot();
            this.currEvent = "draw";
            // console.log("draw")
        }
        // console.log(e);
        e.node.ctx.lineCap = "round";
    }

    async onMove(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onMove(e);
        this._pointerPos = e.pos;
        this._pointerPressure = e.pressure;
        if (this.currEvent == "draw") {
            this.drawLine(e);
        } else if (this.currEvent == "resize") {
            this.handleResize(e);
        }
    }

    handleResize(e: PaintToolEvent<BitmapLayerNode>) {
        if (e.pressure === 0) {
            console.log("Pressure is 0")
            return;
        }
        if (this._downPos === null) {
            console.log("Down pos is null")
            return;
        }

        function distance(a: Vec2, b: Vec2) {
            return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
        }


        this.maxSize = distance(e.pos, this._downPos);
    }

    drawLine(e: PaintToolEvent<BitmapLayerNode>) {

        if (e.pressure < 0.06) {
            return;
        }
        const ctx = e.node.ctx;
        ctx.strokeStyle = this.color;

        if (this.lastPoints.length >= 4) {
            let p1 = this.lastPoints[0];
            let p2 = this.lastPoints[1];
            let p3 = this.lastPoints[2];
            let p4 = this.lastPoints[3];
            ctx.lineWidth = this.getSize(e.pressure)
            drawHermitCurve(ctx, p1, p2, p3, p4)
            this.lastPoints.shift();
        }
        this.lastPoints.push(e.pos);
    }

    async onUp(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onUp(e);
        this._downPos = null;
        this.currEvent = "none";
        this.lastPoints = [];
    }
}
