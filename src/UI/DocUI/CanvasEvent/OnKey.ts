import {IViewerState} from "../DocCanvasState";

export function onKeyDown(state: IViewerState, e: KeyboardEvent) {

    if (e.key === "Control") {
        state.input.ctrlDown = true;
    }
    if (e.key === "Shift") {
        state.input.shiftDown = true;
    }
    if (e.key === "Alt") {
        state.input.altDown = true;
    }
}

export function onKeyUp(state: IViewerState, e: KeyboardEvent) {

    if (e.key === "Control") {
        state.input.ctrlDown = false;
    }
    if (e.key === "Shift") {
        state.input.shiftDown = false;
    }
    if (e.key === "Alt") {
        state.input.altDown = false;
    }
}
