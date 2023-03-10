import {ContextMenu} from "./ContextMenu";
import {DocUIState} from "../DocUIState";
import {documentUI} from "./DocumentUI";

let LayerMenu: ContextMenu | null = null;

export function openLayerMenu(state: DocUIState, pos: [number, number]) {
    if (LayerMenu) {
        LayerMenu.close();
    }
    LayerMenu = new ContextMenu(
        documentUI(state),
        pos,
        "right",
        "center"
    )
}

export function closeLayerMenu() {
    if (LayerMenu) {
        LayerMenu.close();
        LayerMenu = null;
    }
}