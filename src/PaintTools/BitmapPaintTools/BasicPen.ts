import {BitmapPaintTool} from "./BitmapPaintTool";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {drawHermitCurve} from "../../core/src/submodules/common-ts-utils/Canvas/PaintCanvas";
import {br, div} from "../../UI/DOMFunctions";
import {PaintToolUIRenderEvent} from "../PaintTool";

export class BasicPen extends BitmapPaintTool {
    isDrawing: boolean = false;

    lastPoints: Vec2[] = [];

    maxSize: number = 20;
    minSize: number = 5;

    color: string = "#000000";

    _pointerPos: Vec2 = [0, 0];
    _pointerPressure: number = 0;

    currEvent: "draw" |"resize" | "none" = "none";

    async renderUI(e: PaintToolUIRenderEvent): Promise<void> {
        // return super.renderUI(e);
        const pos = this._pointerPos;
        // pos[0] *= e.state.viewer.scale;
        // pos[1] *= e.state.viewer.scale;
        e.ctx.strokeStyle = "#969696";
        e.ctx.lineWidth = 1 / e.state.doc.scale;
        e.ctx.beginPath();
        let size;
        if (this._pointerPressure > 0) {
            size = this.getSize(this._pointerPressure) / 2;
        } else {
            size = this.getSize(0.5) / 2;
        }
        //Draw a circle at the current mouse position
        e.ctx.arc(pos[0], pos[1], size, 0, 2 * Math.PI);
        e.ctx.stroke();

        if (e.dom){
            e.dom.style.cursor = "none";
        }
    }

    getSize(pressure: number): number {
        return (this.maxSize - this.minSize) * pressure + this.minSize;
    }

    // drawUI(e: PaintToolEvent<BitmapLayerNode>, size: number) {
    //
    //     e.ui.ctx.clearRect(0, 0, e.ui.canvas.width, e.ui.canvas.height);
    //     e.ui.ctx.strokeStyle = "#969696";
    //     e.ui.ctx.lineWidth = 1;
    //     e.ui.ctx.beginPath();
    //     // Draw a circle at the current mouse position
    //     e.ui.ctx.arc(e.pos[0], e.pos[1], size, 0, 2 * Math.PI);
    //     e.ui.ctx.stroke();
    // }

    getMenu(): HTMLElement {
        let frame = div();
        let sizeSlider = document.createElement("input");
        sizeSlider.type = "range";
        sizeSlider.min = "1";
        sizeSlider.max = "100";
        sizeSlider.value = "20";
        sizeSlider.oninput = () => {
            this.maxSize = Number(sizeSlider.value);
        }
        frame.appendChild(sizeSlider);
        frame.append(br())
        let colorPicker = document.createElement("input");
        colorPicker.type = "color";
        colorPicker.oninput = () => {
            this.color = colorPicker.value;
            console.log(this.color)
        }
        frame.appendChild(colorPicker);
        return frame;
    }

    async onDown(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onDown(e);
        if (e.key.ctrl && e.key.alt) {
            this.currEvent = "resize";
        }
        // console.log(e);
        e.node.activeCtx.lineCap = "round";
        this.isDrawing = true;
    }

    async onMove(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onMove(e);
        this._pointerPos = e.pos;
        this._pointerPressure = e.pressure;
        if (e.pressure < 0.06) {
            return;
        }
        console.log(e.pressure)
        const ctx = e.node.activeCtx;
        ctx.strokeStyle = this.color;
        console.log(this.color)

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
        this.isDrawing = false;
        e.node.createSnapshot();
        this.lastPoints = [];
    }
}
