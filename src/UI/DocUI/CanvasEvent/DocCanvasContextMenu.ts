import {ContextMenu} from "../../ContextMenu/ContextMenu";
import {br, div, input, label, text} from "../../DOMFunctions";
import {BasicPen} from "../../../PaintTools/BitmapPaintTools/BasicPen";
import {TextTool} from "../../../PaintTools/ShapeTools/TextTool";
import {OVOState} from "../DocCanvasState";
import {documentUI} from "./DocumentUI";

const toolContextMenu = new ContextMenu(
    [0, 0],
    "left",
    "center",
    div(
        {
            children: [
                label({text: "NO CONTENT"})
            ]
        }
    )
)

const fileContextMenu = new ContextMenu(
    [0, 0],
    "center",
    "top",
    div(
        {
            children: [
                label({text: "FILE NO CONTENT"})
            ]
        }
    ),
)

const documentContextMenu = new ContextMenu(
    [0, 0],
    "right",
    "center",
    div(
        {
            children: [
                label({text: "DOCUMENT NO CONTENT"})
            ]
        }
    ),
)

export function closeContextMenu() {
    toolContextMenu.close();
    fileContextMenu.close();
    documentContextMenu.close();
}

export function openToolContextMenu(
    state: OVOState,
    pos: [number, number]) {
    console.log("open tool context menu")
    let tool = state.tool.currentTool;
    toolContextMenu.content = tool.getMenu();

    toolContextMenu.pos = pos;
    toolContextMenu.open();
}

export function openFileContextMenu(pos: [number, number]) {
    fileContextMenu.pos = pos;
    fileContextMenu.open();
}

export function openDocumentContextMenu(state: OVOState, pos: [number, number]) {
    documentContextMenu.content = documentUI(state.doc.doc);
    documentContextMenu.pos = pos;
    documentContextMenu.open();
}

export function onDocCanvasMenu(
    state: OVOState,
    e: MouseEvent) {
    e.preventDefault();
    openToolContextMenu(state, [e.clientX + 10, e.clientY]);
    // openFileContextMenu([e.clientX -10, e.clientY + 10])
    openDocumentContextMenu(state, [e.clientX - 10, e.clientY])
}