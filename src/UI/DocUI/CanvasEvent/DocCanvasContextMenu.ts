import {ContextMenu} from "../../ContextMenu/ShowContextMenu";
import {div, label, text} from "../../DOMFunctions";
import {state} from "../DocCanvasState";

let toolContextMenu = new ContextMenu(
    [0, 0],
    div(
        {
            children: [
                label({text: "NO CONTENT"})
            ]
        }
    )
)

export function closeContextMenu() {
    toolContextMenu.close();
}

export function openToolContextMenu(pos: [number, number]) {
    toolContextMenu.pos = pos;
    let tool = state.tool.currentTool;
    if (!tool) {
        return;
    }

    toolContextMenu.content = tool.getMenu();
    toolContextMenu.open();
}

export function onDocCanvasMenu(e: MouseEvent) {
    e.preventDefault();
    openToolContextMenu([e.clientX, e.clientY]);
}