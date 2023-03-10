import {DocNode} from "../../../../core/src/Documents/DocNodes/DocNode";
import {OVODocument} from "../../../../core/src/Documents/OVODocument";
import {div, mdIcon, text} from "../../../DOM/DOMFunctions";
import {GroupNode} from "../../../../core/src/Documents/DocNodes/GroupNode";
import {currentTheme} from "../../../Themes";
import {findParentNode, notInPath} from "./PathFinding";
import {DragState} from "./DragState";
import {dragDivider} from "./DragDivider";
import {ShapeLayerNode} from "../../../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";

/**
 * It returns a div element that represents the node in the document tree.
 * It uses the drag and drop API to allow the user to drag and drop nodes.
 * It uses recursion to render the children of the node.
 *
 * @param node The node to be represented.
 * @param doc The document that the node belongs to.
 * @param rerender The function that renders the document tree.
 * @param state The state of the drag and drop operation.
 */
export function nodeUI(node: DocNode, doc: OVODocument, rerender: () => void, state: DragState) {
    const out = div()
    const isActive = node === doc.activeNode;
    out.draggable = true;
    let name = " " + node.name;
    let icon = mdIcon(currentTheme.bitmapLayerIconName, 16);
    if (node instanceof GroupNode) {
        name += `/`;
        icon = mdIcon(currentTheme.groupIconName, 16);
    }
    if (node instanceof ShapeLayerNode) {
        icon = mdIcon(currentTheme.shapeLayerIconName, 16);
    }
    const textElement = text(name);
    if (isActive) {
        textElement.style.color = currentTheme.accentText;
        textElement.innerText = node.name + " (active)";
    }
    const nameTag = div()
    nameTag.append(
        icon,
        textElement,
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
        const inPath = !notInPath(doc.rootNode, draggedNode, node)
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

    let background = currentTheme.background;
    const activeBackground = currentTheme.selected;
    const hoverBackground = currentTheme.hover;

    if (isActive) {
        background = activeBackground;
    }

    nameTag.style.backgroundColor = background;
    nameTag.ondragover = (e) => {
        e.preventDefault();
        nameTag.style.backgroundColor = currentTheme.hover;
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
            childrenDiv.appendChild(nodeUI(child, doc, rerender, state));
            childrenDiv.appendChild(dragDivider(i, node, state, rerender));
        }
        out.appendChild(childrenDiv);
    }
    // state.nodeDict[node.name] = node;
    return out;
}
