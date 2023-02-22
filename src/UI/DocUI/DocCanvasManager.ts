import {OVODocument} from "../../core/src/Documents/OVODocument";
import {onWheel} from "./CanvasEvent/DocCanvasEvent";
import {onDown, onMove, onUp} from "./CanvasEvent/OnPointer";
import {onDocCanvasMenu} from "./CanvasEvent/DocCanvasContextMenu";
import {getCheckBoard} from "../../core/src/Documents/BackgroundFills";
import {update} from "./CanvasEvent/ViewerRender";
import {createState, OVOState} from "./DocCanvasState";
import {TextTool} from "../../PaintTools/ShapeTools/TextTool";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {BasicPen} from "../../PaintTools/BitmapPaintTools/BasicPen";
import {printDocNodeTree} from "../../core/src/Debug";
import {DebugPen} from "../../PaintTools/BitmapPaintTools/DebugPen";
import {onKeyDown, onKeyUp} from "./CanvasEvent/OnKey";

//


export function DocCanvasManager(canvas: HTMLCanvasElement, doc: OVODocument) {
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) {
        throw new Error("Could not get 2D context from canvas");
    }
    canvas.style.overflow = "hidden";
    canvas.style.touchAction = "none";
    const state = createState(canvas, ctx, doc, new BasicPen())

    // state.viewer.scale = ;
    state.doc.pos = [
        canvas.width * state.viewer.scale / 2 - doc.width / 2,
        canvas.height * state.viewer.scale / 2 - doc.height / 2
    ];
    let image = new Image();
    image.src = "./assets/paper.png";

    let shapeLayer = new ShapeLayerNode();
    shapeLayer.name = "Shape Layer";
    doc.rootNode.addNode(shapeLayer);
    let bitmapLayer = new BitmapLayerNode(doc.width, doc.height);
    bitmapLayer.name = "Bitmap Layer";
    doc.rootNode.addNode(bitmapLayer);
    state.doc.doc.activeNode = bitmapLayer;

    printDocNodeTree(doc.rootNode);

    // bitmapLayer.activeCtx.fillStyle = "red";
    // bitmapLayer.activeCtx.fillRect(0, 0, 100, 100);

    image.onload = () => {
        const tmpCanvas = new OffscreenCanvas(image.width, image.height);
        const tmpCtx = tmpCanvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        tmpCtx.save();
        tmpCtx.fillStyle = "rgba(0,0,0,1)";
        tmpCtx.fillRect(0, 0, image.width, image.height);
        // tmpCtx.globalCompositeOperation = "source-in";
        tmpCtx.globalAlpha = 0.5;
        tmpCtx.drawImage(image, 0, 0);
        state.viewer.background = ctx.createPattern(tmpCanvas.transferToImageBitmap(), "repeat") as CanvasPattern;
        tmpCtx.restore();

        // let checkBoard = getCheckBoard();

        tmpCtx.drawImage(image, 0, 0);
        // tmpCtx.fillStyle = `rgba(255,255,255,${1 - alpha})`
        // tmpCtx.fillRect(0, 0, image.width, image.height);
        state.doc.background = ctx.createPattern(tmpCanvas.transferToImageBitmap(), "repeat") as CanvasPattern;
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
        update(state, ctx, canvas, doc);
        requestAnimationFrame(callFrame);
    }

    callFrame();
    setupCanvasEvents(state, canvas);
}

function setupPaintTool() {

}

function setupCanvasEvents(state: OVOState, canvas: HTMLCanvasElement) {
    canvas.addEventListener("pointermove", (e) => onMove(state, e))
    canvas.addEventListener("pointerdown", (e) => onDown(state, e));
    canvas.addEventListener("pointerup", (e) => onUp(state, e));
    canvas.addEventListener("contextmenu", (e) => onDocCanvasMenu(state, e))
    canvas.addEventListener("wheel", (e) => onWheel(state, e));

    canvas.addEventListener("keydown", (e) => {onKeyDown(state, e)})
    canvas.addEventListener("keyup", (e) => {onKeyUp(state, e)})
}


