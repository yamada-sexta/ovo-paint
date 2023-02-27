import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {div, text} from "../DOMFunctions";
import {GroupNode} from "../../core/src/Documents/DocNodes/GroupNode";
import * as events from "events";

interface DoceNodeUIEvent {
    activeNode: DocNode;
    onDrop: (e: DragEvent, node: DocNode) => void;
}

export function docNodeUI(node: DocNode, e: DoceNodeUIEvent) {
    const out = div()
    const isActive = node === e.activeNode;
    out.draggable = true;


    const nameTag = div()

    let name = node.name;
    if (node instanceof GroupNode) {
        name += `/`;
    }
    if (isActive){
        name = `[${name}]`;
    }


    nameTag.append(
        // text("Name: "),
        text(name),
    )
    out.appendChild(nameTag)

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
    const activeBackground = "#adadad";
    const hoverBackground = "#efefef";

    if (isActive) {
        background = activeBackground;
    }


    out.style.backgroundColor = background;
    nameTag.ondragover = (e) => {
        e.preventDefault();
        nameTag.style.backgroundColor = "#afafaf";
    }
    nameTag.onpointerenter = (e) => {
        nameTag.style.backgroundColor = hoverBackground;
        e.stopPropagation();
    }
    nameTag.onpointerleave = (e) => {
        nameTag.style.backgroundColor = background;
    }
    nameTag.ondragleave = (e) => {
        e.preventDefault();
        nameTag.style.backgroundColor = background;
    }

    if (node instanceof GroupNode) {
        const childrenDiv = div()
        childrenDiv.style.paddingLeft = "10px";

        for (let child of node.children) {
            childrenDiv.appendChild(docNodeUI(child, e));
        }
        out.appendChild(childrenDiv);
    }
    return out;
}