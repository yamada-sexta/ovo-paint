import {input} from "../../DOMFunctions";
import {closeContextMenu, openToolContextMenu} from "./DocCanvasContextMenu";
import {IViewerState} from "../DocCanvasState";
import {PaintToolEvent} from "../../../core/src/PaintToolEvent";
import {DocNode} from "../../../core/src/Documents/DocNodes/DocNode";

// let isDown = false;
export async function onDown(state: IViewerState, e: PointerEvent) {

    state.input.downPos = [e.offsetX, e.offsetY];
    switch (e.button) {
        case 0:
            await onLeftClick(state, e);
            break;
        case 1:
            await onMiddleClick(state, e);
            break;
        case 2:
            await onRightClick(state, e);
            break;
    }
}

async function onRightClick(state: IViewerState, e: PointerEvent) {
    e.preventDefault();
    console.log("right click")
    openToolContextMenu(state, [e.clientX, e.clientY]);
}

async function onMiddleClick(state: IViewerState, e: PointerEvent) {
    e.preventDefault();
}

async function onLeftClick(state: IViewerState, e: PointerEvent) {
    e.preventDefault();
    closeContextMenu();
    await state.tool.currentTool.onDown(createPaintToolEvent(state, e));
}

function canvasCordToDocCord(state: IViewerState, pos: [number, number]): [number, number] {
    return [
        (pos[0] / state.viewer.scale - state.doc.pos[0]) / state.doc.scale,
        (pos[1] / state.viewer.scale - state.doc.pos[1]) / state.doc.scale
    ]
}

function createPaintToolEvent(state: IViewerState, e: PointerEvent): PaintToolEvent<DocNode> {
    const doc = state.doc.doc;
    const docPos: Vec2 = canvasCordToDocCord(state, [e.offsetX, e.offsetY]);
    // console.log(docPos)
    return {
        pos: docPos,
        doc: doc,
        pressure: e.pressure,
        node: state.doc.doc.activeNode,
        ui: {
            canvas: state.viewer.canvas,
            ctx: state.viewer.ctx,
            scale: state.doc.scale
        },
        key: {
            shift: e.shiftKey,
            ctrl: e.ctrlKey,
            alt: e.altKey,
        },
        history: state.doc.doc._history,
    }
}


export async function onMove(state: IViewerState, e: PointerEvent) {
    state.input.pointerAbsPos = [e.clientX, e.clientY];
    state.input.pointerRelaPos = [e.offsetX, e.offsetY];

    // if (isDown) {
    //     if (e.pressure === 0) {
    //         await onUp(state, e);
    //         return;
    //     }
    // }

    await state.tool.currentTool.onMove(createPaintToolEvent(state, e));
}

export async function onUp(state: IViewerState, e: PointerEvent) {
    state.input.downPos = null;
    console.log("up")
    await state.tool.currentTool.onUp(createPaintToolEvent(state, e));
}
