import {OVOUIManager} from "./UI/OVOUIManager";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {OvoJsonSerializer} from "./core/src/Documents/Serializers/OvoJsonSerializer";
import {initializeUIDependencyOn} from "./UI/InitializeUIDependency";

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

        initializeUIDependencyOn();
    }

    /**
     * Exposes the OVO Paint API to the window.
     */
    setPublic() {
        (window as any).OVO = {
            manager: this.manager,
            save: () => {
                return this.saveDocument()
            },
            open: (s: string) => {
                const serializer = new OvoJsonSerializer();
                const blob = new Blob([s], {type: "application/json"});
                const doc = serializer.fromBlob(blob, "test");
                doc.then((doc) => {
                    console.log(doc)
                    this.manager.currentDocument = doc;
                });
            }
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
