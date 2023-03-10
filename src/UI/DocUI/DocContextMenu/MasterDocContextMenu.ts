import {DocUIState} from "../DocUIState";
import {closeToolMenu, openToolMenu} from "./ToolMenu";
import {closeLayerMenu, openLayerMenu} from "./LayerMenu";

export function openDocContextMenu(state: DocUIState) {
    const pos = state.input.pointerAbsPos;
    openToolMenu(state, [pos[0] + 10, pos[1]]);
    openLayerMenu(state, [pos[0] - 10, pos[1]]);
}

export function closeDocContextMenu() {
    closeToolMenu();
    closeLayerMenu();
}

export function refreshDocContextMenu(state: DocUIState) {
    closeDocContextMenu();
    openDocContextMenu(state);
}