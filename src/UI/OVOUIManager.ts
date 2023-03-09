import {OVODocument} from "../core/src/Documents/OVODocument";
import {openCreateWindow} from "./DocumentCreateUI";
import {DocCanvasManager} from "./DocUI/DocCanvasManager";
import {button, div, text} from "./DOM/DOMFunctions";
import {IOVORootUI} from "./RootFrame/IOVORootUI";
import {OVOWelcomeScreen} from "./RootFrame/OVOWelcomeScreen";
import {OVODocUIFrame} from "./RootFrame/OVODocUIFrame";

/**
 * This class is responsible for managing the UI of OVO Paint.
 * It is responsible for rendering the UI and handling user input.
 */
export class OVOUIManager {
    _currentDocument: OVODocument | null = null;

    _documentList: OVODocument[] = [];

    root: HTMLDivElement;
    frame: HTMLDivElement;

    _currUI: IOVORootUI;

    set currUI(ui: IOVORootUI) {
        this._currUI = ui;
        this.frame.innerHTML = "";
        this.frame.appendChild(ui.getUI(this));
        ui.onAppended(this);
    }

    get currUI(): IOVORootUI {
        return this._currUI;
    }

    get currentDocument(): OVODocument | null {
        return this._currentDocument;
    }

    set currentDocument(doc: OVODocument | null) {
        if (doc === null) {
            throw new Error("Cannot set current document to null");
        }
        this._currentDocument = doc;
        let docIndex = this._documentList.indexOf(doc);
        if (docIndex === -1) {
            this._documentList.push(doc);
        }
        this.currUI = new OVODocUIFrame();
    }

    constructor(root: HTMLDivElement, doc: OVODocument | null = null) {
        this.root = root;
        this.frame = document.createElement("div");
        this.frame.style.width = "100%";
        this.frame.style.height = "100%";
        this.frame.style.visibility = "visible";
        this.root.appendChild(this.frame);
        this.root
        .addEventListener("keydown", (e) => {
            console.log(e)
        });
        this._currUI = {
            getUI: (manager: OVOUIManager) => {
                return div({
                    children: [
                        text("ERROR!")
                    ]
                })
            },
            onAppended: (manager: OVOUIManager) => {
                console.log("ERROR!");
            }
        }
        if (doc === null) {
            this.currUI = new OVOWelcomeScreen();
        } else {
            this.currentDocument = doc;
        }
    }
}

