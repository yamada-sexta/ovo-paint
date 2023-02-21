import {ContextMenu} from "../../ContextMenu/ShowContextMenu";
import {div, label, text} from "../../DOMFunctions";
import {state} from "../DocCanvasState";
import {BasicPen} from "../../../PaintTools/BitmapPaintTools/BasicPen";
import {TextTool} from "../../../PaintTools/ShapeTools/TextTool";

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
    console.log("open tool context menu")
    toolContextMenu.pos = pos;
    let tool = state.tool.currentTool;
    if (!tool) {
        // return;
        tool = new TextTool();
    }
    toolContextMenu.content = tool.getMenu();
    toolContextMenu.open();
}

export function onDocCanvasMenu(e: MouseEvent) {
    e.preventDefault();
    openToolContextMenu([e.clientX, e.clientY]);
}