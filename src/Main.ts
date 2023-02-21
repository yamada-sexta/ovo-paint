import {OVOUIManager} from "./UI/OVOUIManager";
import {DraggableWindow} from "./UI/DraggableWindow";
import {div, text} from "./UI/DOMFunctions";

function main() {
    // new DraggableWindow([0, 0], div(
    //     {
    //         children: [
    //             text("Hello World")
    //         ]
    //     }
    // ), "Test Window");
    let root = document.getElementById("ovo-root") as HTMLDivElement;
    let manager = new OVOUIManager(root);
}

main()
