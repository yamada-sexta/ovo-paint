import {DocUIState} from "../DocUIState";
import {closeToolMenu, openToolMenu} from "./ToolMenu";
import {closeLayerMenu, openLayerMenu} from "./LayerMenu";
import {Vec2} from "../../../core/src/submodules/common-ts-utils/Math/Vector";


let openPos: Vec2 | null = null;
let openState: DocUIState | null = null;

export function openDocContextMenu(state: DocUIState, pos: [number, number] | null = null) {
    if (pos === null) {
        pos = state.input.pointerAbsPos;
    }
    openToolMenu(state, [pos[0] + 10, pos[1]]);
    openLayerMenu(state, [pos[0] - 10, pos[1]]);
    console.log(pos)
    openPos = pos;
    openState = state;
}

export function closeDocContextMenu() {
    closeToolMenu();
    closeLayerMenu();
    openPos = null;
    openState = null;
}

export function refreshDocContextMenu(state: DocUIState, openPos: [number, number] | null = null) {
    closeDocContextMenu();
    openDocContextMenu(state, openPos);
}

export function statelessRefreshDocContextMenu() {
    if (openState) {
        refreshDocContextMenu(openState, openPos);
    }
}
