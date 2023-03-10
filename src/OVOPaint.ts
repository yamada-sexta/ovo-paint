import {OVOUIManager} from "./UI/OVOUIManager";
import {OVODocument} from "./core/src/Documents/OVODocument";

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
    setPublic() {
        (window as any).OVO = {
            manager: this.manager,
        }
    }

    openDocument(doc: OVODocument) {
        this.manager.currentDocument = doc;
    }
}