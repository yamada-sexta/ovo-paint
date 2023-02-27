import {br, div, input, label, text} from "../../DOMFunctions";
import {OVODocument} from "../../../core/src/Documents/OVODocument";
import {DocNode} from "../../../core/src/Documents/DocNodes/DocNode";
import {GroupNode} from "../../../core/src/Documents/DocNodes/GroupNode";
import {openFileContextMenu} from "./DocCanvasContextMenu";
import {docNodeUI} from "../DocNodeUI";

function docBackgroundDropdown(doc: OVODocument) {
    const docBackgroundOptions = [
        {
            text: "Transparent",
            value: "transparent",
        },
        {
            text: "White",
            value: "white",
        },
        {
            text: "Black",
            value: "black",
        }
    ]
    const out = document.createElement("select");
    for (let option of docBackgroundOptions) {
        const optionElement = document.createElement("option");
        optionElement.text = option.text;
        optionElement.value = option.value;
        out.add(optionElement);
    }
    out.onchange = (e) => {
        console.log("doc background dropdown", e.target)
        // @ts-ignore
        state.doc.doc.background = e.target.value;
    }
    return out;
}


export function documentUI(doc: OVODocument) {
    return div(
        {
            children: [
                text("Current Document:"),
                br(),
                input({
                    type: "text",
                    value: doc.name,
                    onchange: (e) => {
                        if (e.target instanceof HTMLInputElement)
                            doc.name = e.target.value;
                    }
                }),
                br(),
                label({text: "Background: "}),
                docBackgroundDropdown(doc),
                br(),
                docNodeUI(doc.rootNode, {activeNode: doc.activeNode})
            ]
        }
    )
}