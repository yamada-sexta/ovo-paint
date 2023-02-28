import {OVOUIManager} from "./UI/OVOUIManager";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {BitmapLayerNode} from "./core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {GroupNode} from "./core/src/Documents/DocNodes/GroupNode";

export class OVOPaint {
    manager: OVOUIManager;

    /**
     * Creates a new instance of OVOPaint.
     * @param root The root element of the OVO Paint UI.
     * @param isPublic Whether or not to expose the OVO Paint API to the window.
     */
    constructor(root: HTMLDivElement, isPublic: boolean) {
        // TEST
        const width = 400;
        const height = 400;
        const doc = new OVODocument(
            "Test Document",
            width, height
        )
        const layer = new BitmapLayerNode(400, 400);
        const folder1 = new GroupNode("folder1");
        const folder2 = new GroupNode("folder2");
        doc.rootNode.addNode(folder1);
        doc.rootNode.addNode(folder2);
        doc.rootNode.addNode(new GroupNode("folder3"));
        doc.rootNode.addNode(new GroupNode("folder4"));
        folder1.addNode(layer);
        doc.activeNode = layer;
        this.manager = new OVOUIManager(root, doc);
        if (isPublic) {
            this.setPublic();
        }
    }
    setPublic() {
        (window as any).OVO = {
            manager: this.manager,

        }
    }
}