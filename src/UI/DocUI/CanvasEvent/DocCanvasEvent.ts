import {OVOState} from "../DocCanvasState";

export async function onWheel(state: OVOState, e: WheelEvent) {
    e.preventDefault();
    if (state.doc.scale < state.doc.scaleMin && e.deltaY > 0) {
        return;
    }
    if (state.doc.scale > state.doc.scaleMax && e.deltaY < 0) {
        return;
    }

    let scaleCenter = [e.offsetX / state.viewer.scale, e.offsetY / state.viewer.scale];

    let scale = 1 - e.deltaY / 1000;
    state.doc.scale *= scale;
    state.doc.pos[0] -= (scaleCenter[0] - state.doc.pos[0]) * (scale - 1);
    state.doc.pos[1] -= (scaleCenter[1] - state.doc.pos[1]) * (scale - 1);
}
