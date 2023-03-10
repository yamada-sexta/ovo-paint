import {GroupNode} from "../../core/src/Documents/DocNodes/GroupNode";
import {PaintTool} from "../PaintTool";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";

export class GroupTool extends PaintTool<GroupNode>{
    isCompatibleWithNode(node: DocNode): boolean {
        return node instanceof GroupNode;
    }
    getMenu(): HTMLElement {
        const menu = document.createElement("div");
        menu.classList.add("group-tool-menu");
        menu.textContent = "Group";
        return menu;
    }

}