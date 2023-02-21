import {input} from "../../DOMFunctions";
import {closeContextMenu, openToolContextMenu} from "./DocCanvasContextMenu";
import {state} from "../DocCanvasState";

export function onDown(e: PointerEvent) {
    state.input.downPos = [e.offsetX, e.offsetY];
    switch (e.button) {
        case 0:
            onLeftClick(e);
            break;
        case 1:
            onMiddleClick(e);
            break;
        case 2:
            onRightClick(e);
            break;
    }
}

function onRightClick(e: PointerEvent) {
    e.preventDefault();
    openToolContextMenu([e.clientX, e.clientY], input({type: "text", value: "Hello World"}));
}

function onMiddleClick(e: PointerEvent) {
    e.preventDefault();
}

function onLeftClick(e: PointerEvent) {
    e.preventDefault();
    closeContextMenu();
}


export function onMove(e: PointerEvent) {
    state.input.pointerAbsPos = [e.clientX, e.clientY];
    state.input.pointerRelaPos = [e.offsetX, e.offsetY];
}

export function onUp(e: PointerEvent) {
    state.input.downPos = null;
}