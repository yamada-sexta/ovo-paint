import {OVOUIManager} from "./UI/OVOUIManager";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {DocSerializer} from "./core/src/Documents/Serializers/DocSerializer";
import {OvoJsonSerializer} from "./core/src/Documents/Serializers/OvoJsonSerializer";

export class OVOPaint {
    manager: OVOUIManager;
    /**
     * Creates a new instance of OVOPaint.
     * @param root The root element of the OVO Paint UI.
     * @param isPublic Whether or not to expose the OVO Paint API to the window.
     */
    constructor(root: HTMLDivElement, isPublic: boolean) {
        this.manager = new OVOUIManager(root);
        if (isPublic) {
            this.setPublic();
        }
    }

    /**
     * Exposes the OVO Paint API to the window.
     */
    setPublic() {
        (window as any).OVO = {
            manager: this.manager,
            save: () => this.saveDocument(),
        }
    }

    /**
     * Opens a document in OVO Paint.
     * @param doc
     */
    openDocument(doc: OVODocument) {
        this.manager.currentDocument = doc;
    }

    /**
     * Saves the current document.
     */
    saveDocument() {
        const doc = this.manager.currentDocument;
        if (doc === null) {
            return;
        }
        const serializer = new OvoJsonSerializer();
        const blob = serializer.toBlob(doc);
        console.log(blob);

    }
}
