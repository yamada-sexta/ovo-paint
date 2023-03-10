import {IOVORootUI} from "./IOVORootUI";
import {OVOUIManager} from "../OVOUIManager";
import {manageCanvas} from "../DocUI/ManageCanvas";

export class OVODocUIFrame implements IOVORootUI {
    canvas: HTMLCanvasElement;
    constructor() {
        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.visibility = "visible";
        this.canvas = canvas;
    }
    getUI(manager: OVOUIManager): HTMLElement {
        if (manager.currentDocument === null) {
            throw new Error("Cannot show document UI with no current document");
        }
        return (this.canvas);
    }

    onAppended(manager: OVOUIManager): void {
        if (manager.currentDocument === null) {
            throw new Error("Cannot show document UI with no current document");
        }
        manageCanvas(this.canvas, manager.currentDocument);
    }
}
