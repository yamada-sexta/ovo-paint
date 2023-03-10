import {input} from "../../DOM/DOMFunctions";
import {closeContextMenu, openToolContextMenu} from "./DocCanvasContextMenu";
import {OVOState} from "../DocCanvasState";
import {PaintToolEvent} from "../../../core/src/PaintToolEvent";
import {DocNode} from "../../../core/src/Documents/DocNodes/DocNode";
import {Vec2} from "../../../core/src/submodules/common-ts-utils/Math/Vector";

// let isDown = false;
let rightDown = false;

export async function onDown(state: OVOState, e: PointerEvent) {
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

async function onRightClick(state: OVOState, e: PointerEvent) {
    e.preventDefault();
    console.log("right click")
    openToolContextMenu(state, [e.clientX + 100,
        e.clientY + 100]);
}

async function onMiddleClick(state: OVOState, e: PointerEvent) {
    e.preventDefault();
}

async function onLeftClick(state: OVOState, e: PointerEvent) {
    e.preventDefault();
    closeContextMenu();
    await state.tool.currentTool.onDown(createPaintToolEvent(state, e));
}

function canvasCordToDocCord(state: OVOState, pos: [number, number]): [number, number] {
    return [
        (pos[0] / state.viewer.scale - state.doc.pos[0]) / state.doc.scale,
        (pos[1] / state.viewer.scale - state.doc.pos[1]) / state.doc.scale
    ]
}

function createPaintToolEvent(state: OVOState, e: PointerEvent): PaintToolEvent<DocNode> {
    const docPos: Vec2 = canvasCordToDocCord(state, [e.offsetX, e.offsetY]);
    let pressure = e.pressure;
    if (e.pointerType === "mouse") {
        pressure = 1;
    }
    return {
        pos: docPos,
        pressure: pressure,
        node: state.doc.doc.activeNode,
        key: {
            shift: e.shiftKey,
            ctrl: e.ctrlKey,
            alt: e.altKey,
        },
        history: state.doc.doc._history,
    }
}


export async function onMove(state: OVOState, e: PointerEvent) {
    state.input.pointerAbsPos = [e.clientX, e.clientY];
    state.input.canvasRawPos = [e.offsetX, e.offsetY];
    state.input.docRelaPos = canvasCordToDocCord(state, [e.offsetX, e.offsetY]);

    if (e.buttons === 0 || e.buttons === 1) {
        await state.tool.currentTool.onMove(createPaintToolEvent(state, e));
    }
}


export async function onUp(state: OVOState, e: PointerEvent) {
    state.input.downPos = null;
    console.log("up")
    await state.tool.currentTool.onUp(createPaintToolEvent(state, e));
}
