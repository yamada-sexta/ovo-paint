import {BitmapPaintTool} from "./BitmapPaintTool";
import {PaintToolEvent} from "../../Core/PaintToolEvent";
import {BitmapLayerNode} from "../../Core/Documents/DocNodes/Layers/BitmapLayerNode";
import {drawPointDebug} from "../../Core/submodules/common-ts-utils/Canvas/PaintCanvas";

// @registerPaintTool
export class DebugPen extends BitmapPaintTool {
    isDrawing: boolean = false;

    async onDown(e: PaintToolEvent<BitmapLayerNode>) {
        this.isDrawing = true;
    }

    async onMove(e: PaintToolEvent<BitmapLayerNode>) {
        if (!this.isDrawing) return;
        console.log(e)
        const ctx = e.node.ctx;
        drawPointDebug(ctx, e.pos);
    }

    async onUp(e: PaintToolEvent<BitmapLayerNode>) {
        this.isDrawing = false;
        e.node.createSnapshot();
    }
}
