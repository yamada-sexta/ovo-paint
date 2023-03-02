import {PaintTool} from "./PaintTool";
import {BasicPen} from "./BitmapPaintTools/BasicPen";
import {TextTool} from "./ShapeTools/TextTool";
import {BezierCurveTool} from "./ShapeTools/BezierCurveTool";
import {DebugPen} from "./BitmapPaintTools/DebugPen";

export function registerPaintTool(constructor: Function) {
    if (constructor.prototype instanceof PaintTool) {
        try{
            // @ts-ignore
            paintTools.push(new constructor());
            console.log("Registered PaintTool: " + constructor.name);
        }catch (e) {
            console.group("registerPaintTool")
            console.error("Error while registering PaintTool: " + constructor.name);
            console.error(e);
            console.groupEnd();
        }
    }
    // return constructor;
}
export const paintTools: PaintTool[] = [
    new BasicPen(),
    new TextTool(),
    new BezierCurveTool(),
    new DebugPen()
];