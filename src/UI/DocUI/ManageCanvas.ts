import {OVODocument} from "../../Core/Documents/OVODocument";
import {onWheel} from "./CanvasEvent/DocCanvasEvent";
import {onDown, onMove, onUp} from "./CanvasEvent/OnPointer";
import {update} from "./CanvasEvent/ViewerRender";
import {createDocUIState, DocUIState} from "./DocUIState";
import {BasicPen} from "../../PaintTools/BitmapPaintTools/BasicPen";
import {onKeyDown, onKeyUp} from "./CanvasEvent/OnKey";
import {onContextMenu} from "./CanvasEvent/OnContextMenu";
import {assets} from "../../Assets/Assets";

/**
 * Setup the canvas.
 * @param canvas
 * @param doc
 */
export async function manageCanvas(canvas: HTMLCanvasElement, doc: OVODocument) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) {
        throw new Error("Could not get 2D context from canvas");
    }
    const state = createDocUIState(canvas, ctx, doc, new BasicPen())
    await setupCanvasStyle(state, canvas, ctx);
    await setupCanvasEvents(state, canvas, ctx);
}

async function setupCanvasStyle(state: DocUIState, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const doc = state.doc.doc;
    canvas.style.overflow = "hidden";
    canvas.style.touchAction = "none";

    let image = new Image();
    image.src = assets.src_Assets_Images_paper_png.src;
    if (state.doc.doc.activeNode == state.doc.doc.rootNode) {
        console.log(doc.name + " is empty");
    }
    image.onload = () => {
        const tmpCanvas = new OffscreenCanvas(image.width, image.height);
        const tmpCtx = tmpCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        tmpCtx.save();
        tmpCtx.fillStyle = "rgba(0,0,0,1)";
        tmpCtx.fillRect(0, 0, image.width, image.height);
        tmpCtx.globalAlpha = 0.5;
        tmpCtx.drawImage(image, 0, 0);
        state.viewer.background = ctx.createPattern(tmpCanvas.transferToImageBitmap(), "repeat") as CanvasPattern;
        tmpCtx.restore();
        tmpCtx.drawImage(image, 0, 0);
        state.doc.background = ctx.createPattern(tmpCanvas.transferToImageBitmap(), "repeat") as CanvasPattern;
    }

    async function updateCanvasScale() {
        let scale = Math.max(window.devicePixelRatio, 1);
        canvas.width = canvas.clientWidth * scale;
        canvas.height = canvas.clientHeight * scale;
        state.viewer.scale = scale;
        ctx.scale(scale, scale);
    }

    window.addEventListener("resize", async () => {
        await updateCanvasScale();
    });

    await updateCanvasScale();


    console.log(state.viewer.scale, state.doc.scale)

    console.log(canvas.width, canvas.height)

    console.log(doc.width, doc.height)

    const scale = state.viewer.scale;
    const canvasWidth = canvas.clientWidth / scale;
    const canvasHeight = canvas.clientHeight / scale;

    state.doc.pos = [
        (canvasWidth / 2 - doc.width * state.doc.scale / 2),
        (canvasHeight / 2 - doc.height * state.doc.scale / 2)
    ];
    console.log(state.doc.pos)
}


async function setupCanvasEvents(state: DocUIState, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    canvas.addEventListener("pointermove", (e) => onMove(state, e))
    canvas.addEventListener("pointerdown", (e) => onDown(state, e));
    canvas.addEventListener("pointerup", (e) => onUp(state, e));
    canvas.addEventListener("contextmenu", (e) => onContextMenu(state, e))
    canvas.addEventListener("wheel", (e) => onWheel(state, e));
    document.body.addEventListener("keydown", (e) => {
        onKeyDown(state, e)
    })
    document.body.addEventListener("keyup", (e) => {
        onKeyUp(state, e)
    })

    async function callFrame() {
        await update(state, ctx, canvas, state.doc.doc);
        requestAnimationFrame(callFrame);
    }

    await callFrame();

}
