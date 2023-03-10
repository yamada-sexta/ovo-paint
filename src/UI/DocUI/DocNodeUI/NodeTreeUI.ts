import {OVODocument} from "../../../core/src/Documents/OVODocument";
import {div} from "../../DOM/DOMFunctions";
import {currentTheme} from "../../Themes";
import {nodeUI} from "./NodeUI";


export function nodeTreeUI(doc: OVODocument) {
    const out = div();
    out.style.overflow = "auto";
    out.style.height = "150px";
    // out.style.margin = "5px";
    out.style.padding = "5px";

    //
    out.style.borderColor = currentTheme.border;
    out.style.borderStyle = "solid";
    out.style.borderWidth = "1px";
    out.style.backgroundColor = currentTheme.background;
    out.style.color = currentTheme.text;

    const state = {
        draggedNode: null,
        nodeDict: {}
    }
    const rerender = () => {
        out.innerHTML = "";
        state.draggedNode = null;
        state.nodeDict = {};
        out.appendChild(nodeUI(doc.rootNode, doc, rerender, state));
    }
    rerender();
    return out;
}