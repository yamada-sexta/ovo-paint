import {ContextMenu} from "../../ContextMenu/ShowContextMenu";
import {div, label, text} from "../../DOMFunctions";
import {BasicPen} from "../../../PaintTools/BitmapPaintTools/BasicPen";
import {TextTool} from "../../../PaintTools/ShapeTools/TextTool";
import {IViewerState} from "../DocCanvasState";

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

export function openToolContextMenu(
    state: IViewerState,
    pos: [number, number]) {
    console.log("open tool context menu")
    toolContextMenu.pos = pos;
    let tool = state.tool.currentTool;
    toolContextMenu.content = tool.getMenu();
    toolContextMenu.open();
}

export function onDocCanvasMenu(
    state: IViewerState,
    e: MouseEvent) {
    e.preventDefault();
    openToolContextMenu(state, [e.clientX, e.clientY]);
}