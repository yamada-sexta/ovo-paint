import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {div, text} from "../DOMFunctions";
import {GroupNode} from "../../core/src/Documents/DocNodes/GroupNode";
import * as events from "events";
import {OVODocument} from "../../core/src/Documents/OVODocument";

export function dragDivider(index: number, group: GroupNode) {
    const out = div();
    out.style.width = "100%";
    out.style.height = "1px";
    out.style.backgroundColor = "#000000";
    return out;
}

interface dragState {
    draggedNode: DocNode | null;
    nodeDict: { [key: string]: DocNode };
}

export function findParentNode(node: DocNode, root: GroupNode): GroupNode | null {
    for (let child of root.children) {
        if (child === node) {
            return root;
        }
        if (child instanceof GroupNode) {
            const parent = findParentNode(node, child);
            if (parent) {
                return parent;
            }
        }
    }
    return null;
}

export function signalNodeUI(node: DocNode, doc: OVODocument, rerender: () => void, state: dragState) {
    const out = div()
    const isActive = node === doc.activeNode;
    out.draggable = true;
    let name = node.name;
    if (node instanceof GroupNode) {
        name += `/`;
    }
    if (isActive) {
        name = `[${name}]`;
    }

    const nameTag = div()
    nameTag.append(
        text(name),
    )
    out.appendChild(nameTag)

    out.ondragstart = (e) => {
        console.log("drag start", node.name, e)
        e.stopPropagation();
        state.draggedNode = node;
    }

    out.ondrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("drop", node.name, e)
        console.log("drop on", e.target)
        if (state.draggedNode) {
            if (!(node instanceof GroupNode)) {
                console.log("can't drop on non-group node")
                return;
            }

            const draggedNode = state.draggedNode;
            if (node === draggedNode) {
                console.log("can't drop on self")
                return;
            }
            const parent = findParentNode(draggedNode, doc.rootNode);
            if (!parent) {
                console.log("dragged node not found in tree")
                return;
            }
            if (parent === node) {
                console.log("NOT IMPLEMENTED: drop on parent")
                return;
            }
            parent.removeNode(draggedNode);
            node.children.push(draggedNode);
            state.draggedNode = null;
            rerender();
        }
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
    nameTag.onclick = (e) => {
        e.stopPropagation();
        doc.activeNode = node;
        rerender();
    }

    if (node instanceof GroupNode) {
        const childrenDiv = div()
        childrenDiv.style.paddingLeft = "10px";
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            childrenDiv.appendChild(signalNodeUI(child, doc, rerender, state));
            if (i < node.children.length - 1) {
                childrenDiv.appendChild(dragDivider(i, node));
            }
        }
        out.appendChild(childrenDiv);
    }
    state.nodeDict[node.name] = node;
    return out;
}

export function docNodesUI(doc: OVODocument) {
    const out = div();
    const state = {
        draggedNode: null,
        nodeDict: {}
    }
    const rerender = () => {
        out.innerHTML = "";
        state.draggedNode = null;
        state.nodeDict = {};
        out.appendChild(text("Document Nodes:"))
        out.appendChild(signalNodeUI(doc.rootNode, doc, rerender, state));
    }
    rerender();
    return out;
}