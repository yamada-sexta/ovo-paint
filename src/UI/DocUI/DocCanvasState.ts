import {PaintTool} from "../../PaintTools/PaintTool";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {OVODocument} from "../../core/src/Documents/OVODocument";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";

interface IDocUIState {
    scaleMax: number;
    scaleMin: number;
    scale: number;
    pos: [number, number];
    background: string | CanvasGradient | CanvasPattern;
    doc: OVODocument;
}

interface IViewerCanvasState {
    background: string | CanvasGradient | CanvasPattern;
    scale: number;
    canvas: HTMLCanvasElement | OffscreenCanvas;
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
}

interface IInputState {
    canvasRawPos: [number, number]; // Absolute position on canvas
    pointerAbsPos: [number, number]; // Absolute position on window
    downPos: [number, number] | null;
    docRelaPos: [number, number]; // Position relative to the document
    ctrlDown: boolean;
    shiftDown: boolean;
    altDown: boolean;
}

interface IToolState {
    currentTool: PaintTool;
}

export interface OVOState {
    doc: IDocUIState;
    input: IInputState;
    viewer: IViewerCanvasState;
    tool: IToolState;
}

export function createState(
    canvas: HTMLCanvasElement | OffscreenCanvas,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    doc: OVODocument,
    tool: PaintTool
): OVOState {
    return {
        doc: {
            scaleMax: 30,
            scaleMin: 0.01,
            scale: 1,
            pos: [0, 0],
            background: "#000000",
            doc: doc
        },
        input: {
            canvasRawPos: [0, 0],
            pointerAbsPos: [0, 0],
            docRelaPos: [0, 0],
            downPos: null,
            ctrlDown: false,
            shiftDown: false,
            altDown: false
        },
        viewer: {
            background: "#1f1f1f",
            scale: window.devicePixelRatio,
            canvas: canvas,
            ctx: ctx
        },
        tool: {
            currentTool: tool
        }
    }
}
