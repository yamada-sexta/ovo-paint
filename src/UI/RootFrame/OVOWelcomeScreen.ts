import {IOVORootUI} from "./IOVORootUI";
import {OVOUIManager} from "../OVOUIManager";
import {br, button, div, text} from "../DOMFunctions";
import {openCreateWindow} from "../CreateUI";

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
                    manager.showDocumentUI();
                }
            }
        })
        let openBtn = button({
            text: "Open",
            onclick: () => {
                throw new Error("Not implemented");
            }
        })

        return div({
            children: [
                title,
                br(),
                createBtn,
                openBtn
            ]
        })
    }

    onAppended(manager: OVOUIManager): void {
        console.log("Welcome screen appended");
    }
}