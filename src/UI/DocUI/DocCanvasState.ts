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
    // currentNode: DocNode | null;
    // currentBitmapLayer: BitmapLayerNode | null;
    // currentShapeLayer: DocNode | null;

}

interface IViewerCanvasState {
    background: string | CanvasGradient | CanvasPattern;
    scale: number;


    canvas: HTMLCanvasElement | OffscreenCanvas;
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
}

interface IInputState {
    pointerRelaPos: [number, number];
    pointerAbsPos: [number, number];
    downPos: [number, number] | null;

    ctrlDown: boolean;
    shiftDown: boolean;
    altDown: boolean;

}

interface IToolState {
    currentTool: PaintTool;
}

export interface IViewerState {
    doc: IDocUIState;
    input: IInputState;
    viewer: IViewerCanvasState;
    tool: IToolState;
}

export function createState(
    canvas:HTMLCanvasElement | OffscreenCanvas,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    doc: OVODocument,
    tool: PaintTool
): IViewerState {
    return {
        doc: {
            scaleMax: 30,
            scaleMin: 0.01,

            scale: 1,

            pos: [0, 0],

            background: "#ff6b6b",

            doc: doc
        },
        input: {
            pointerRelaPos: [0, 0],
            pointerAbsPos: [0, 0],
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
