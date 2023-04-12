import {OVODocument} from "../../../Core/Documents/OVODocument";
import {DocUIState} from "../DocUIState";


async function drawDoc(
    state: DocUIState,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    canvas: HTMLCanvasElement | OffscreenCanvas,
    doc: OVODocument) {
    // Draw the document
    const w = doc.width;
    const h = doc.height;

    ctx.strokeStyle = "rgba(0,0,0,0.5)";
    ctx.filter = "blur(5px)";
    ctx.strokeRect(
        state.doc.pos[0],
        state.doc.pos[1],
        w * state.doc.scale,
        h * state.doc.scale
    );
    ctx.filter = "none";
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = state.doc.background;
    ctx.fillRect(state.doc.pos[0], state.doc.pos[1], w * state.doc.scale, h * state.doc.scale);


    ctx.save();

    // const docScale = state.doc.scale;
    ctx.translate(state.doc.pos[0], state.doc.pos[1]);
    ctx.scale(state.doc.scale, state.doc.scale);


    doc.render({
        renderMode: "export"
    })
    ctx.drawImage(doc.content, 0, 0);
    // console.log("Rendered doc");
    let dom = null;
    if (state.viewer.canvas instanceof HTMLCanvasElement) {
        dom = state.viewer.canvas.parentElement;
    }

    let relaPos = state.input.docRelaPos;

    let inRange = true;
    if (relaPos[0] < 0 || relaPos[1] < 0 || relaPos[0] > w || relaPos[1] > h) {
        inRange = false;
    }
    await state.tool.currentTool.renderCanvasUI({
        canvas: canvas,
        ctx: ctx,
        state: state,
        dom: dom,
        inDocRange: inRange
    })
    ctx.restore();
    if (state.doc.scale > 5) {
        drawPixelGrid(state, ctx, canvas);
    }
}

function drawPixelGrid(state: DocUIState, ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, canvas: HTMLCanvasElement | OffscreenCanvas) {
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

function drawCanvasBackground(state: DocUIState,
                              ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
                              canvas: HTMLCanvasElement | OffscreenCanvas) {
    // Initialize the canvas
    ctx.save();
    ctx.scale(1 / state.viewer.scale, 1 / state.viewer.scale);
    ctx.fillStyle = state.viewer.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    ctx.scale(state.viewer.scale, state.viewer.scale);
}


export async function update(
    state: DocUIState,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    canvas: HTMLCanvasElement | OffscreenCanvas,
    doc: OVODocument) {
    ctx.save();
    drawCanvasBackground(state, ctx, canvas);
    // Draw the document
    await drawDoc(state, ctx, canvas, doc);
    ctx.restore();
    // ctx.restore();
}
