import {BitmapPaintTool} from "./BitmapPaintTool";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {drawPointDebug} from "../../core/src/submodules/common-ts-utils/Canvas/PaintCanvas";

export class DebugPen extends BitmapPaintTool {
    isDrawing: boolean = false;
    onDown(e: PaintToolEvent<BitmapLayerNode>) {
        this.isDrawing = true;
        super.onDown(e);
    }

    onMove(e: PaintToolEvent<BitmapLayerNode>) {
        super.onMove(e);
        if (!this.isDrawing) return;
        console.log(e)
        const ctx = e.node.activeCtx;
        drawPointDebug(ctx, e.pos);
    }

    onUp(e: PaintToolEvent<BitmapLayerNode>) {
        super.onUp(e);
        this.isDrawing = false;
        e.node.createSnapshot();
    }
}
