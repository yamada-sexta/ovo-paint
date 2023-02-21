import {PaintTool} from "../../PaintTools/PaintTool";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {OVODocument} from "../../core/src/Documents/OVODocument";

interface IDocUIState {
    scaleMax: number;
    scaleMin: number;

    scale: number;

    pos: [number, number];

    background: string | CanvasGradient | CanvasPattern;

    doc: OVODocument | null;
}

interface IViewerState {
    background: string | CanvasGradient | CanvasPattern;

    scale: number;
}

interface IInputState {
    pointerRelaPos: [number, number];
    pointerAbsPos: [number, number];
    downPos: [number, number] | null;
}

interface IToolState {
    currentTool: PaintTool<DocNode> | null;
}

interface IDocumentViewerState {
    doc: IDocUIState;
    input: IInputState;
    viewer: IViewerState;
    tool: IToolState;
}

export const state: IDocumentViewerState = {
    doc: {
        scaleMax: 10,
        scaleMin: 0.1,

        scale: 1,

        pos: [0, 0],

        background: "#ff6b6b",

        doc: null
    },
    input: {
        pointerRelaPos: [0, 0],
        pointerAbsPos: [0, 0],
        downPos: null
    },
    viewer: {
        background: "#1f1f1f",

        scale: 1
    },
    tool: {
        currentTool: null
    }
}