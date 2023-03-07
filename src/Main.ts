import {OVOUIManager} from "./UI/OVOUIManager";
import {DraggableWindow} from "./UI/DraggableWindow";
import {baseClass, div, text} from "./UI/DOMFunctions";
import * as monaco from "monaco-editor";
import {OVOPaint} from "./OVOPaint";
import {showTempMessage} from "./UI/MessageBox/Message";
import {PaintToolPreviewCanvas} from "./UI/PaintToolUI/PaintToolDemoCanvas";
import {initializeUIDependencyOn} from "./UI/InitializeUIDependency";
import {paintTools} from "./PaintTools/PaintTools";
function main() {
    let root = document.getElementById("ovo-root") as HTMLDivElement;

    initializeUIDependencyOn();

    root.style.overflow = "hidden";

    let ovo = new OVOPaint(root, true);
    console.log(paintTools);
}

main()
