import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {div, mdIcon, text} from "../DOMFunctions";
import {GroupNode} from "../../core/src/Documents/DocNodes/GroupNode";
import {OVODocument} from "../../core/src/Documents/OVODocument";

export function dragDivider(index: number, group: GroupNode, state: dragState, rerender: () => void) {
    const out = div();
    const isFirst = index === 0;
    const isLast = index === group.children.length - 1;
    out.style.width = "100%";
    out.style.height = "5px";
    out.style.backgroundColor = "#ffffff";
    out.ondragover = (e) => {
        out.style.backgroundColor = "#a1a1a1";
        e.preventDefault();
        e.stopPropagation();
    }
    out.ondragleave = (e) => {
        out.style.backgroundColor = "#ffffff";
        e.preventDefault();
        e.stopPropagation();
    }
    out.ondrop = (e) => {
        out.style.backgroundColor = "#e5e5e5";
        e.preventDefault();
        e.stopPropagation();
        if (!state.draggedNode) {
            return;
        }
        const parent = findParentNode(state.draggedNode, group);
        if (!parent) {
            console.log("dragged node not found in tree")
            return;
        }
        parent.removeNode(state.draggedNode);
        if (isFirst && isLast) {
            group.children.push(state.draggedNode)
        } else if (isFirst) {
            group.children.splice(0, 0, state.draggedNode);
        } else if (isLast) {
            group.children.push(state.draggedNode);
        } else if (parent === group) {
            group.children.splice(index, 0, state.draggedNode);
        } else {
            group.children.splice(index + 1, 0, state.draggedNode);
        }
        rerender();
    }
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

/**
 * Returns true if the target node is not in the path from the parent to the destination node.
 * @param parent
 * @param destination
 * @param target
 */
export function notInPath(parent: DocNode, destination: DocNode, target: DocNode): boolean {
    if (parent === destination) {
        return false;
    }
    if (parent === target) {
        return true;
    }
    if (parent instanceof GroupNode) {
        for (let child of parent.children) {
            if (notInPath(child, destination, target)) {
                return true;
            }
        }
    }
    return false;
}

export function signalNodeUI(node: DocNode, doc: OVODocument, rerender: () => void, state: dragState) {
    const out = div()
    const isActive = node === doc.activeNode;
    out.draggable = true;
    let name = " " + node.name;
    let icon = mdIcon("draft", 16);
    if (node instanceof GroupNode) {
        name += `/`;
        icon = mdIcon("folder", 16);
    }
    if (isActive) {
        name = `${name} *`;
        // icon = mdIcon("star", 16);
    }
    const nameTag = div()
    nameTag.append(
        icon,
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
        if (!state.draggedNode) {
            console.log("no dragged node")
            return;
        }

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

        const inPath =!notInPath(doc.rootNode, draggedNode, node)

        console.log("inPath", inPath)

        if (inPath) {
            console.log("can't drop on potential detached node")
            return;
        }

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

    let background = "#ffffff";
    const activeBackground = "#adadad";
    const hoverBackground = "#efefef";

    if (isActive) {
        background = activeBackground;
    }

    nameTag.style.backgroundColor = background;
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
        if (node.children.length !== 0) {
            childrenDiv.appendChild(dragDivider(0, node, state, rerender));
        }
        for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            childrenDiv.appendChild(signalNodeUI(child, doc, rerender, state));
            childrenDiv.appendChild(dragDivider(i, node, state, rerender));
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