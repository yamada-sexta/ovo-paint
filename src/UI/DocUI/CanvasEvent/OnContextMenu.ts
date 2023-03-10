import {DocUIState} from "../DocUIState";
import {openDocContextMenu} from "../DocContextMenu/MasterDocContextMenu";

export function onContextMenu(state: DocUIState, e: MouseEvent) {
    e.preventDefault();
    openDocContextMenu(state);
}