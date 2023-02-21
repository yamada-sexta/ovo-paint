// @ts-ignore
import $ from "jquery";

import {OVODocument} from "../core/src/Documents/OVODocument";
import {openCreateWindow} from "./CreateUI";
import {DocCanvasManager} from "./DocUI/DocCanvasManager";

/**
 * This class is responsible for managing the UI of OVO Paint.
 * It is responsible for rendering the UI and handling user input.
 */
export class OVOUIManager {

    _currentDocument: OVODocument | null = null;

    _documentList: OVODocument[] = [];

    root: HTMLDivElement;

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
    }
    constructor(root: HTMLDivElement, doc: OVODocument | null = null) {
        if (doc) {
            throw new Error("Not implemented yet");
        }
        this.root = root;

        // root.onmousedown = (e) => {
        //     e.preventDefault();
        // }
        // root.oncontextmenu = (e) => {
        //     e.preventDefault();
        //     return false;
        // }

        if (doc === null) {
            this.showNullDocumentUI();
        } else {
            this.currentDocument = doc;
        }
    }

    showNullDocumentUI() {
        let root = this.root;
        // Clear the root
        root.innerHTML = "";
        $(root).append(`
            <div>OVO Paint</div>
        `);
        // Create two buttons
        let createBtn = $(`<button>Create</button>`)
            .on("click", async () => {
                let doc = await openCreateWindow();
                if (doc) {
                    this.currentDocument = doc;
                    this.showDocumentUI();
                }
            });
        let openBtn = $(`<button>Open</button>`)
            .on("click", () => {
                console.log("Open button clicked");
            });
        // Append the buttons to the root
        $(root).append(createBtn);
        $(root).append(openBtn);
        console.log(root)
    }

    showDocumentUI() {
        if (this.currentDocument === null) {
            throw new Error("Cannot show document UI when there is no document");
        }

        const root = this.root;
        // Clear the root
        root.innerHTML = "";
        // Create a canvas that fills the root
        let canvas = document.createElement("canvas");
        // canvas.width = root.clientWidth;
        // canvas.height = root.clientHeight;
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        $(root).append(canvas);
        DocCanvasManager(canvas, this.currentDocument);
    }
}
