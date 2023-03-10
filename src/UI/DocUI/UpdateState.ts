import {DocUIState} from "./DocUIState";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {PaintTool} from "../../PaintTools/PaintTool";
import {paintTools} from "../../PaintTools/PaintTools";


function getAvailableTools(node: DocNode): PaintTool[] {
    const tools = [];
    for (const tool of paintTools) {
        if (tool.isCompatibleWithNode(node)) {
            tools.push(tool);
        }
    }
    return tools;
}

export function updateState(state: DocUIState) {
    const newAvailableTools = getAvailableTools(state.doc.doc.activeNode);
    console.log(newAvailableTools)
    state.tool.availableTools = newAvailableTools;
    if (!newAvailableTools.includes(state.tool.currentTool)) {
        state.tool.currentTool = newAvailableTools[0];
    }
    return state;
}