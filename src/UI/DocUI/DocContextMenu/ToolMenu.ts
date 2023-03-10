import {ContextMenu} from "./ContextMenu";
import {DocUIState} from "../DocUIState";
import {br, button, div, input, label, text} from "../../DOM/DOMFunctions";
import {refreshDocContextMenu, statelessRefreshDocContextMenu} from "./MasterDocContextMenu";

let toolMenu: ContextMenu | null = null;

function getToolMenu(state: DocUIState) {
    const frame = div();

    frame.append("Tool Menu")
    frame.append(br())
    const toolsDiv = div();
    for (const tool of state.tool.availableTools) {
        const radioInput = input({type: "radio", value: tool.name});
        radioInput.checked = state.tool.currentTool === tool;
        radioInput.name = "tool";
        radioInput.id = tool.name;
        const radioLabel = text(tool.name);
        radioInput.addEventListener("change", () => {
            state.tool.currentTool = tool;
            statelessRefreshDocContextMenu();
        })
        radioLabel.htmlFor = tool.name;
        toolsDiv.append(radioInput);
        toolsDiv.append(radioLabel);
        toolsDiv.append(br())
    }
    frame.append(toolsDiv);
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
