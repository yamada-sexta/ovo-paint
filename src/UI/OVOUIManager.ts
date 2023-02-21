// @ts-ignore
import $ from "jquery";

import {OVODocument} from "../core/src/Documents/OVODocument";
import {openCreateWindow} from "./CreateUI";
import {DocCanvasManager} from "./DocCanvasManager";

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

    set currentDocument(doc: OVODocument) {
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
            .on("click", () => {
                openCreateWindow(
                    arg => {
                        console.log("Create button clicked");
                        this.currentDocument = new OVODocument(
                            arg.name,
                            arg.width,
                            arg.height
                        );
                        this.showDocumentUI();
                    }
                )
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
        let docCanvasManager = new DocCanvasManager(canvas, this.currentDocument);
    }
}
