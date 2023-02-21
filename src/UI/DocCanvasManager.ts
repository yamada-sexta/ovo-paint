import {OVODocument} from "../core/src/Documents/OVODocument";

export class DocCanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    background: string = "#c9c9c9";


    canvasScaleFactor: number;

    constructor(canvas: HTMLCanvasElement, ovoDoc: OVODocument) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!this.ctx) {
            throw new Error("Failed to get 2D context from canvas.");
        }

        this.canvasScaleFactor = window.devicePixelRatio;
        this.updateCanvasSize();
        const callFrame = () => {
            this.frame();
            requestAnimationFrame(callFrame);
        }
        callFrame();

        window.addEventListener("resize", async () => {
            await this.updateCanvasSize();
        });
    }

    async updateCanvasSize() {
        let scale = Math.max(window.devicePixelRatio, 1) ;
        this.canvas.width = this.canvas.clientWidth * scale;
        this.canvas.height = this.canvas.clientHeight * scale;
        this.canvasScaleFactor = scale;
        console.log("Resized canvas to " + this.canvas.width + "x" + this.canvas.height)
    }

    /**
     * This function is called every frame.
     */
    frame() {
        const canvas = this.canvas;
        const ctx = this.ctx;
        ctx.save();
        this.ctx.scale(this.canvasScaleFactor, this.canvasScaleFactor);
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        ctx.moveTo(0, 0);
        ctx.lineTo(100, 100);
        ctx.stroke();

        ctx.restore();

    }
}
