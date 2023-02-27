import {br, div, input, label, text} from "../../DOMFunctions";
import {OVODocument} from "../../../core/src/Documents/OVODocument";
import {DocNode} from "../../../core/src/Documents/DocNodes/DocNode";
import {GroupNode} from "../../../core/src/Documents/DocNodes/GroupNode";
import {openFileContextMenu} from "./DocCanvasContextMenu";

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

function docNodeUI(node: DocNode, doc:OVODocument) {


    const out = div({
        children: [
            text("Name: "),
            text(node.name)
        ]
    })
    out.draggable = true;

    out.ondragstart = (e) => {
        // e.preventDefault();
        console.log("drag start", node.name, e)
    }
    out.ondrop = (e) => {
        e.preventDefault();
        console.log("drop", node.name, e)
        console.log("drop on", e.target)
    }

    let background = "#ffffff";
    if (node === doc.activeNode){
        background = "#ffd1d1";
    }

    out.style.backgroundColor = background;
    out.ondragenter = (e) => {
        e.preventDefault();
        out.style.backgroundColor = "#e2e2e2";
    }
    out.ondragleave = (e) => {
        e.preventDefault();
        out.style.backgroundColor = background;
    }

    if (node instanceof GroupNode){
        const childrenDiv = div()
        childrenDiv.style.paddingLeft = "20px";

        for (let child of node.children) {
            childrenDiv.appendChild(docNodeUI(child, doc));
        }
        out.appendChild(childrenDiv);
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
                // text("Layers: " + doc.activeNode.name),
                // docNodeUI(doc.activeNode),
                docNodeUI(doc.rootNode, doc)
            ]
        }
    )
}