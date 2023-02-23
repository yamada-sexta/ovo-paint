import {OVODocument} from "../core/src/Documents/OVODocument";
import {openCreateWindow} from "./CreateUI";
import {DocCanvasManager} from "./DocUI/DocCanvasManager";
import {button, div, text} from "./DOMFunctions";
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

    _currUI: IOVORootUI;

    set currUI(ui: IOVORootUI) {
        this._currUI = ui;
        this.root.innerHTML = "";
        this.root.appendChild(ui.getUI(this));
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
        this._currUI = {
            getUI: (manager: OVOUIManager) => {
                return div({
                    children: [
                        text("ERROR!")
                    ]
                })
            }
        }
        if (doc === null) {
            this.currUI = new OVOWelcomeScreen();
        } else {
            this.currentDocument = doc;
        }
    }


    showDocumentUI() {
        if (this.currentDocument === null) {
            throw new Error("Cannot show document UI when there is no document");
        }

        const root = this.root;
        // Clear the root
        root.innerHTML = "";
        let canvas = document.createElement("canvas");
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        root.appendChild(canvas);
        DocCanvasManager(canvas, this.currentDocument);
    }
}

