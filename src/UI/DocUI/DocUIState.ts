import {PaintTool} from "../../PaintTools/PaintTool";
import {OVODocument} from "../../core/src/Documents/OVODocument";
import {updateState} from "./UpdateState";

interface IDocDisplayState {
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
    availableTools: PaintTool[];
}

/**
 * The state of the document UI.
 * It will be passed to all the UI components.
 * It should only contain state of one single document.
 */
export interface DocUIState {
    doc: IDocDisplayState;
    input: IInputState;
    viewer: IViewerCanvasState;
    tool: IToolState;
}

/**
 * Create a new state for the document UI.
 * @param canvas
 * @param ctx
 * @param doc
 * @param tool
 */
export function createDocUIState(
    canvas: HTMLCanvasElement | OffscreenCanvas,
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
    doc: OVODocument,
    tool: PaintTool
): DocUIState {
    const newState: DocUIState =
        {
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
                currentTool: tool,
                availableTools: []
            }
        }

    updateState(newState);
    return newState;
}
