import {OVODocument} from "../../core/src/Documents/OVODocument";
import { onWheel} from "./CanvasEvent/DocCanvasEvent";
import {onDown, onMove, onUp} from "./CanvasEvent/OnPointer";
import {onDocCanvasMenu} from "./CanvasEvent/DocCanvasContextMenu";
import {getCheckBoard} from "../../core/src/Documents/BackgroundFills";
import {state} from "./DocCanvasState";

let checkBoard = getCheckBoard();

export function DocCanvasManager(canvas: HTMLCanvasElement, doc: OVODocument) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) {
        throw new Error("Could not get 2D context from canvas");
    }
    state.viewer.scale = window.devicePixelRatio;
    state.doc.pos = [canvas.width * state.viewer.scale / 2, canvas.height * state.viewer.scale / 2];
    state.doc.doc = doc;
    // DocCanvasState.docWidth = doc.width;
    // DocCanvasState.docHeight = doc.height;

    let image = new Image();
    image.src = "./src/assets/paper.png";

    image.onload = () => {
        const tmpCanvas = new OffscreenCanvas(image.width, image.height);
        const tmpCtx = tmpCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        tmpCtx.drawImage(image, 0, 0);
        state.viewer.background = ctx.createPattern(tmpCanvas.transferToImageBitmap(), "repeat") as CanvasPattern;
    }

    async function updateCanvasScale() {
        let scale = Math.max(window.devicePixelRatio, 1);
        canvas.width = canvas.clientWidth * scale;
        canvas.height = canvas.clientHeight * scale;
        state.viewer.scale = scale;
        ctx.scale(scale, scale);
        console.log("Resized canvas to " + canvas.width + "x" + canvas.height);
        console.log("Scale factor: " + scale);
    }

    (async () => {
        await updateCanvasScale();
    })();

    window.addEventListener("resize", async () => {
        await updateCanvasScale();
    });

    function callFrame() {
        update(ctx, canvas, doc);
        requestAnimationFrame(callFrame);
    }

    callFrame();

    setupCanvasEvents(canvas);
}

function setupPaintTool(){

}

function setupCanvasEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("contextmenu", onDocCanvasMenu);
    canvas.addEventListener("wheel", onWheel);
}

function drawCanvasBackground(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
                              canvas: HTMLCanvasElement | OffscreenCanvas) {
    // Initialize the canvas
    ctx.save();
    ctx.scale(1 / state.viewer.scale, 1 / state.viewer.scale);
    ctx.fillStyle = state.viewer.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,0.61)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.scale(state.viewer.scale, state.viewer.scale);
}

function drawDoc(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
                 canvas: HTMLCanvasElement | OffscreenCanvas,
                 doc: OVODocument) {
    // Draw the document
    const w = doc.width;
    const h = doc.height;

    ctx.save();

    // const docScale = state.doc.scale;

    // ctx.strokeStyle = "rgba(0,0,0,0.2)";
    // ctx.filter = "blur(10px)";
    // ctx.strokeRect(
    //     DocCanvasState.docPos[0],
    //     DocCanvasState.docPos[1],
    //     w * DocCanvasState.docScaleFactor,
    //     h * DocCanvasState.docScaleFactor);
    ctx.filter = "none";
    ctx.imageSmoothingEnabled = false;

    ctx.translate(state.doc.pos[0], state.doc.pos[1]);
    ctx.scale(state.doc.scale, state.doc.scale);


    doc.render({
        renderMode: "export"
    })
    ctx.drawImage(doc.content, 0, 0);

    ctx.restore();
    // Draw grid
    // console.log(state.doc.scale);
    if (state.doc.scale > 5) {
        drawPixelGrid(ctx, canvas);
    }
}

function drawPixelGrid(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, canvas: HTMLCanvasElement | OffscreenCanvas) {
    ctx.strokeStyle = "rgb(136,136,136)";
    ctx.lineWidth = 0.3;

    const startX = state.doc.pos[0];
    const startY = state.doc.pos[1];

    let docWidth = 0;

    let docHeight = 0;
    if (state.doc.doc) {
        docWidth = state.doc.doc.width;
        docHeight = state.doc.doc.height;
    }


    const endX = startX + docWidth * state.doc.scale;
    const endY = startY + docHeight * state.doc.scale;


    for (let i = startX + state.doc.scale; i < endX; i += state.doc.scale) {
        ctx.beginPath();
        ctx.moveTo(i, startY);
        ctx.lineTo(i, endY);
        ctx.stroke();
    }
    for (let i = startY + state.doc.scale; i < endY; i += state.doc.scale) {
        ctx.beginPath();
        ctx.moveTo(startX, i);
        ctx.lineTo(endX, i);
        ctx.stroke();
    }
}


function update(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
                canvas: HTMLCanvasElement | OffscreenCanvas,
                doc: OVODocument) {
    ctx.save();
    drawCanvasBackground(ctx, canvas);
    // Draw the document
    drawDoc(ctx, canvas, doc);
    ctx.restore();
}