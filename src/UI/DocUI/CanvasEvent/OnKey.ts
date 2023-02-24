import {OVOState} from "../DocCanvasState";
import {BitmapLayerNode} from "../../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";

export function onKeyDown(state: OVOState, e: KeyboardEvent) {

    if (e.key === "Control") {
        state.input.ctrlDown = true;
    }
    if (e.key === "Shift") {
        state.input.shiftDown = true;
    }
    if (e.key === "Alt") {
        state.input.altDown = true;
    }

    if (e.key === "z" && state.input.ctrlDown) {
        if (state.doc.doc.activeNode instanceof BitmapLayerNode) {
            state.doc.doc.activeNode.undo();
        }
    }
}

export function onKeyUp(state: OVOState, e: KeyboardEvent) {

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
