import {IOVORootUI} from "./IOVORootUI";
import {OVOUIManager} from "../OVOUIManager";
import {br, button, div, text} from "../DOM/DOMFunctions";
import {openCreateWindow} from "../DocumentCreateUI";
import {currentTheme} from "../Themes";

export class OVOWelcomeScreen implements IOVORootUI {
    getUI(manager: OVOUIManager): HTMLElement {
        let title = (div({
            children: [
                text("Welcome to OVO Paint!")
            ]
        }))
        // Create two buttons
        let createBtn = button({
            text: "Create",
            onclick: async () => {
                let doc = await openCreateWindow();
                if (doc) {
                    manager.currentDocument = doc;
                }
            }
        })
        let openBtn = button({
            text: "Open",
            onclick: () => {
                throw new Error("Not implemented");
            }
        })

        const out= div({
            children: [
                title,
                br(),
                createBtn,
                openBtn
            ]
        })
        out.style.backgroundColor = currentTheme.secondary;
        return out;
    }

    onAppended(manager: OVOUIManager): void {
        console.log("Welcome screen appended");
    }
}
