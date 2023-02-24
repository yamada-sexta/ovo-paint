import {PaintTool} from "../../PaintTools/PaintTool";
import {BitmapPaintTool} from "../../PaintTools/BitmapPaintTools/BitmapPaintTool";
import {createState} from "../DocUI/DocCanvasState";
import {OVODocument} from "../../core/src/Documents/OVODocument";

export class PaintToolPreviewCanvas {
    // canvas: HTMLCanvasElement;
    // private ctx: CanvasRenderingContext2D;
    // tool: PaintTool;

    // constructor(tool: BitmapPaintTool) {
    //     this.canvas = document.createElement("canvas");
    //     this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    //     this.tool = tool;
    //     this.update();
    // }

    update() {
        // this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // const tool = this.tool;
        for (let i = 0; i < 1; i += 0.01) {
            console.log(this._getCurvePoint(i))
        }
    }

    _getCurvePoint(t: number) {
        let p0 = {x: 0, y: 50};
        let p1 = {x: 50, y: 100};
        let p2 = {x: 50, y: -100};
        let p3 = {x: 100, y: 50};
        let x = Math.pow(1 - t, 3) * p0.x + 3 * Math.pow(1 - t, 2) * t * p1.x + 3 * (1 - t) * Math.pow(t, 2) * p2.x + Math.pow(t, 3) * p3.x;
        let y = Math.pow(1 - t, 3) * p0.y + 3 * Math.pow(1 - t, 2) * t * p1.y + 3 * (1 - t) * Math.pow(t, 2) * p2.y + Math.pow(t, 3) * p3.y;
        return {x: x, y: y};
    }
}
