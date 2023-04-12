import {DocUIState} from "../DocUIState";
import {PaintToolEvent} from "../../../Core/PaintToolEvent";
import {DocNode} from "../../../Core/Documents/DocNodes/DocNode";
import {Vec2} from "../../../Core/submodules/common-ts-utils/Math/Vector";
import {closeDocContextMenu} from "../DocContextMenu/MasterDocContextMenu";

// let isDown = false;
let rightDown = false;

export async function onDown(state: DocUIState, e: PointerEvent) {
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

async function onRightClick(state: DocUIState, e: PointerEvent) {
    e.preventDefault();
}

async function onMiddleClick(state: DocUIState, e: PointerEvent) {
    e.preventDefault();
}

async function onLeftClick(state: DocUIState, e: PointerEvent) {
    e.preventDefault();
    if (state.contextMenu.open){
        closeDocContextMenu();
        state.contextMenu.open = false;
        return;
    }

    await state.tool.currentTool.onDown(createPaintToolEvent(state, e));
}

function canvasCordToDocCord(state: DocUIState, pos: [number, number]): [number, number] {
    return [
        (pos[0] / state.viewer.scale - state.doc.pos[0]) / state.doc.scale,
        (pos[1] / state.viewer.scale - state.doc.pos[1]) / state.doc.scale
    ]
}

function createPaintToolEvent(state: DocUIState, e: PointerEvent): PaintToolEvent<DocNode> {
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
        // tracker: state.doc.doc
    }
}


export async function onMove(state: DocUIState, e: PointerEvent) {
    state.input.pointerAbsPos = [e.clientX, e.clientY];
    state.input.canvasRawPos = [e.offsetX, e.offsetY];
    state.input.docRelaPos = canvasCordToDocCord(state, [e.offsetX, e.offsetY]);

    if (e.buttons === 0 || e.buttons === 1) {
        await state.tool.currentTool.onMove(createPaintToolEvent(state, e));
    }
}


export async function onUp(state: DocUIState, e: PointerEvent) {
    state.input.downPos = null;
    await state.tool.currentTool.onUp(createPaintToolEvent(state, e));
}
