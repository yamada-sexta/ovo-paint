import {IOVORootUI} from "./IOVORootUI";
import {OVOUIManager} from "../OVOUIManager";
import {br, button, div, text} from "../DOM/DOMFunctions";
import {openCreateWindow} from "../DocumentCreateUI";
import {currentTheme} from "../Themes";
import {
    SystemFileAccessFileGetter
} from "../../core/src/submodules/common-ts-utils/Files/SystemFileAccess/SystemFileAccessFileGetter";
import {OvoJsonSerializer} from "../../core/src/Documents/Serializers/OvoJsonSerializer";

const welcomeMessages = [
    "Welcome to OVO Paint",
    "Welcome back to OVO Paint!",
    "Hello there :)",
]

function getRandomWelcomeMessage() {
    return welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];
}

export class OVOWelcomeScreen implements IOVORootUI {
    getUI(manager: OVOUIManager): HTMLElement {
        let title = (div({
            children: [
                text(getRandomWelcomeMessage()),
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
            onclick: async () => {
                const handlers = await (new SystemFileAccessFileGetter()).showOpenDialog({
                    types: [
                        {
                            description: "OVO Paint Document",
                            accept: {
                                "application/json": [".ovojson"]
                            }
                        }
                    ]
                });
                if (handlers.length === 0) {
                    return;
                }
                const handler = handlers[0];

                const newDoc = await (new OvoJsonSerializer()).fromBlob(await handler.read(), handler.name);
                if (newDoc) {
                    newDoc.saveFileHandle = handler;
                    manager.currentDocument = newDoc;
                }
            }
        })

        const out = div({
            children: [
                title,
                br(),
                createBtn,
                openBtn
            ]
        })
        out.style.backgroundColor = currentTheme.secondary;
        out.style.color = currentTheme.primary;
        out.style.width = "100%";
        out.style.height = "100%";

        return out;
    }

    onAppended(manager: OVOUIManager): void {
        console.log("Welcome screen appended");
    }
}
