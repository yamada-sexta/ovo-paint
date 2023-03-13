import {div} from "../../../DOM/DOMFunctions";
import {currentTheme} from "../../../Themes";
import {nodeUI} from "./NodeUI";
import {updateState} from "../../UpdateState";
import {DocUIState} from "../../DocUIState";
import {DragState} from "./DragState";
import {refreshDocContextMenu} from "../MasterDocContextMenu";

/**
 * Renders a tree of nodes using node UI
 * @param uiState The UI state to update.
 */
export function nodeTreeUI(uiState: DocUIState) {
    const out = div();
    const doc = uiState.doc.doc;
    // out.style.overflow = "auto";
    // out.style.height = "150px";
    out.style.padding = "5px";
    out.style.borderColor = currentTheme.border;
    out.style.borderStyle = "solid";
    out.style.borderWidth = "1px";
    out.style.backgroundColor = currentTheme.background;
    out.style.color = currentTheme.text;
    const state: DragState = {
        draggedNode: null,
        // nodeDict: {}
    }
    state.draggedNode = null;
    // let first = true;
    const rerender = () => {
        updateState(uiState);

        refreshDocContextMenu(uiState)

        // out.innerHTML = "";

        // state.nodeDict = {};
        // out.appendChild(nodeUI(doc.rootNode, doc, rerender, state));
    }
    out.appendChild(nodeUI(doc.rootNode, doc, rerender, state));
    // rerender();
    return out;
}
