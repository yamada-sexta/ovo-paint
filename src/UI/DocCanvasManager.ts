import {OVODocument} from "../core/src/Documents/OVODocument";

let background: string = "#c9c9c9";
let canvasScaleFactor: number = 1;
let docScaleFactor: number = 1;
const docScaleMax: number = 10;
const docScaleMin: number = 0.1;

let docPos: [number, number] = [0, 0];

let pointerRelaPos: [number, number] = [0, 0];
let pointerAbsPos: [number, number] = [0, 0];

let downPos: [number, number] | null = null;

let docWidth: number = 0;
let docHeight: number = 0;

export function DocCanvasManager(canvas: HTMLCanvasElement, doc: OVODocument) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) {
        throw new Error("Could not get 2D context from canvas");
    }
    canvasScaleFactor = window.devicePixelRatio;
    docPos = [canvas.width / 2, canvas.height / 2];
    docWidth = doc.width;
    docHeight = doc.height;

    async function updateCanvasScale() {
        let scale = Math.max(window.devicePixelRatio, 1);
        canvas.width = canvas.clientWidth * scale;
        canvas.height = canvas.clientHeight * scale;
        canvasScaleFactor = scale;
        ctx.scale(scale, scale);
        console.log("Resized canvas to " + canvas.width + "x" + canvas.height)
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

function setupCanvasEvents(canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);

    canvas.addEventListener("wheel", onWheel);
}
async function onWheel(e: WheelEvent) {
    e.preventDefault();
    if (docScaleFactor < docScaleMin && e.deltaY > 0) {
        return;
    }
    if (docScaleFactor > docScaleMax && e.deltaY < 0) {
        return;
    }

    let scaleCenter = [e.offsetX / canvasScaleFactor, e.offsetY / canvasScaleFactor];

    let scale = 1 - e.deltaY / 1000;
    docScaleFactor *= scale;
    docPos[0] -= (scaleCenter[0] - docPos[0]) * (scale - 1);
    docPos[1] -= (scaleCenter[1] - docPos[1]) * (scale - 1);
}
function onDown(e: PointerEvent) {
    downPos = [e.offsetX, e.offsetY];

}

function onMove(e: PointerEvent) {
    pointerAbsPos = [e.clientX, e.clientY];
    pointerRelaPos = [e.offsetX, e.offsetY];

}

function onUp(e: PointerEvent) {
    downPos = null;
}

function drawCanvasBackground(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
                              canvas: HTMLCanvasElement | OffscreenCanvas) {
    // Initialize the canvas
    ctx.scale(canvasScaleFactor, canvasScaleFactor);
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawDoc(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
                 canvas: HTMLCanvasElement | OffscreenCanvas,
                 doc: OVODocument) {
    // Draw the document
    const w = doc.width;
    const h = doc.height;

    ctx.save();

    ctx.translate(docPos[0], docPos[1]);
    ctx.scale(docScaleFactor, docScaleFactor);
    // When the scale is 10x, the alpha is 0.1
    // When the scale is 1x, the alpha is 1
    const alpha = 1 / docScaleFactor;
    ctx.strokeStyle = "rgba(0,0,0," + alpha + ")";
    ctx.filter = "blur(10px)";
    ctx.strokeRect(0, 0, w, h);
    ctx.filter = "none";
    ctx.imageSmoothingEnabled = false;

    doc.render({
        renderMode: "export"
    })
    ctx.drawImage(doc.content, 0, 0);

    ctx.restore();
    // Draw grid
    if (docScaleFactor > 5){
        drawPixelGrid(ctx, canvas);
    }
}

function drawPixelGrid(ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D, canvas: HTMLCanvasElement | OffscreenCanvas){
    ctx.strokeStyle = "rgb(136,136,136)";
    ctx.lineWidth = 0.3;

    const startX = docPos[0];
    const startY = docPos[1];

    const endX = Math.min(canvas.width, docPos[0] + docWidth * docScaleFactor);
    const endY = Math.min(canvas.height, docPos[1] + docHeight * docScaleFactor);

    for (let i = startX + docScaleFactor; i < endX; i += docScaleFactor) {
        ctx.beginPath();
        ctx.moveTo(i, startY);
        ctx.lineTo(i, endY);
        ctx.stroke();
    }
    for (let i = startY + docScaleFactor; i < endY; i += docScaleFactor) {
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