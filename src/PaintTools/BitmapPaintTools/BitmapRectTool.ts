import {BitmapPaintTool} from "./BitmapPaintTool";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";

export class BitmapRectTool extends BitmapPaintTool {
    downPos: Vec2 | null = null;

    async onDown(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onDown(e);
        this.downPos = e.pos;

    }

    drawRect(ctx: OffscreenCanvasRenderingContext2D, ePos: Vec2) {
        if (this.downPos === null) return;
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(this.downPos[0], this.downPos[1], ePos[0] - this.downPos[0], ePos[1] - this.downPos[1]);
    }

    async onMove(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onMove(e);
        this.drawRect(e.node.ctx, e.pos);
    }

    async onUp(e: PaintToolEvent<BitmapLayerNode>) {
        await super.onUp(e);
        this.drawRect(e.node.ctx, e.pos)
        this.downPos = null;
        e.node.createSnapshot();
    }
}
