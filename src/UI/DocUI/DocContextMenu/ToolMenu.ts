import {ContextMenu} from "./ContextMenu";
import {DocUIState} from "../DocUIState";
import {br, button, div} from "../../DOM/DOMFunctions";
import {refreshDocContextMenu} from "./MasterDocContextMenu";

let toolMenu: ContextMenu | null = null;

function getToolMenu(state: DocUIState) {
    const frame = div();

    frame.append("Tool Menu")
    frame.append(br())
    for (let tool of state.tool.availableTools) {
        frame.append(button({
            text: tool.constructor.name,
            onclick: () => {
                state.tool.currentTool = tool;
                refreshDocContextMenu(state);
                // closeToolMenu();
            }
        }));
    }
    const tool = state.tool.currentTool;
    if (tool) {
        frame.append(tool.getMenu());
    }
    return frame;
}

export function openToolMenu(state: DocUIState, pos: [number, number]) {
    if (toolMenu) {
        toolMenu.close();
    }


    toolMenu = new ContextMenu(
        getToolMenu(state),
        pos,
        "left",
        "center"
    )
}

export function closeToolMenu() {
    if (toolMenu) {
        toolMenu.close();
        toolMenu = null;
    }
}