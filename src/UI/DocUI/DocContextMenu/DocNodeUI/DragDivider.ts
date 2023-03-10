import {GroupNode} from "../../../../core/src/Documents/DocNodes/GroupNode";
import {div} from "../../../DOM/DOMFunctions";
import {currentTheme} from "../../../Themes";
import {DragState} from "./DragState";
import {findParentNode} from "./PathFinding";

export function dragDivider(index: number, group: GroupNode, state: DragState, rerender: () => void) {
    const out = div();
    const isFirst = index === 0;
    const isLast = index === group.children.length - 1;
    out.style.width = "100%";
    out.style.height = "5px";
    out.style.backgroundColor = currentTheme.background;
    out.ondragover = (e) => {
        out.style.backgroundColor = currentTheme.hover;
        e.preventDefault();
        e.stopPropagation();
    }
    out.ondragleave = (e) => {
        out.style.backgroundColor = currentTheme.background;
        e.preventDefault();
        e.stopPropagation();
    }
    out.ondrop = (e) => {
        out.style.backgroundColor = currentTheme.background;
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