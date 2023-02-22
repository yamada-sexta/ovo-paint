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
    let state ={
        ctrl: false,
        shift: false,
        alt: false
    }
    document.body.addEventListener("keydown" , (e) => {

        if (e.key == "Control") {
            state.ctrl = true;
        }
        if (e.key == "Shift") {
            state.shift = true;
        }
        if (e.key == "Alt") {
            state.alt = true;
        }
        console.log(state)
    })
    document.body.addEventListener("keyup" , (e) => {
        if (e.key == "Control") {
            state.ctrl = false;
        }
        if (e.key == "Shift") {
            state.shift = false;
        }
        if (e.key == "Alt") {
            state.alt = false;
        }
    })
    let root = document.getElementById("ovo-root") as HTMLDivElement;
    let manager = new OVOUIManager(root);
}

main()
