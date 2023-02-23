import {IOVORootUI} from "./IOVORootUI";
import {OVOUIManager} from "../OVOUIManager";
import {DocCanvasManager} from "../DocUI/DocCanvasManager";
import {div, text} from "../DOMFunctions";

export class OVODocUIFrame implements IOVORootUI{
    getUI(manager: OVOUIManager): HTMLElement {
        if (manager.currentDocument === null) {
            throw new Error("Cannot show document UI with no current document");
        }
        // Clear the root
        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.visibility = "visible";

        return (canvas);
    }
}