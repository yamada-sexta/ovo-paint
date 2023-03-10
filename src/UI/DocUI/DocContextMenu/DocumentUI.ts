import {br, div, input, label, text} from "../../DOM/DOMFunctions";
import {OVODocument} from "../../../core/src/Documents/OVODocument";
import {nodeTreeUI} from "./DocNodeUI/NodeTreeUI";
import {DocUIState} from "../DocUIState";

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
        try {
            // @ts-ignore
            doc.background = e.target.value;
        } catch (e) {
            console.log("doc background dropdown error", e)
        }
    }
    return out;
}


export function documentUI(state:DocUIState) {
    const doc = state.doc.doc;
    return div(
        {
            children: [
                // text("Current Document:"),
                // br(),
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
                nodeTreeUI(state)
            ]
        }
    )
}