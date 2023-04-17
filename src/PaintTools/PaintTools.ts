import {PaintTool} from "./PaintTool";
import {BasicPen} from "./BitmapPaintTools/BasicPen";
import {TextTool} from "./ShapeTools/TextTool";
import {DebugPen} from "./BitmapPaintTools/DebugPen";
import {GroupTool} from "./GroupPaintTools/GroupTool";
import {SimpleShapeTool} from "./ShapeTools/SimpleShapeTool";
import {NodeTool} from "./NodePaintTool/NodeTool";
import {ScriptShapeTool} from "./ShapeTools/ScriptShapeTool";
import {PasteTool} from "./BitmapPaintTools/PasteTool";

export function registerPaintTool(constructor: Function) {
    if (constructor.prototype instanceof PaintTool) {
        try {
            // @ts-ignore
            paintTools.push(new constructor());
            console.log("Registered PaintTool: " + constructor.name);
        } catch (e) {
            console.group("registerPaintTool")
            console.error("Error while registering PaintTool: " + constructor.name);
            console.error(e);
            console.groupEnd();
        }
    }
}

export const paintTools: PaintTool[] = [
    new BasicPen(),
    new TextTool(),
    new DebugPen(),
    new GroupTool(),
    new SimpleShapeTool(),
    new NodeTool(),
    new ScriptShapeTool(),
    new PasteTool(),
];
