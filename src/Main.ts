import {OVOPaint} from "./OVOPaint";
import {initializeUIDependencyOn} from "./UI/InitializeUIDependency";
import {paintTools} from "./PaintTools/PaintTools";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {BitmapLayerNode} from "./core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {GroupNode} from "./core/src/Documents/DocNodes/GroupNode";
import {ShapeLayerNode} from "./core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {assets} from "./Assets/Assets";

async function main() {
    // tmp();
    let root = document.getElementById("ovo-root") as HTMLDivElement;

    console.log(
        (() => {
            console.log("test1");
            return "test";
        })()
    );
    console.log(assets.src_Assets_Help_MD)

    initializeUIDependencyOn();
    // root.style.overflow = "hidden";

    // typeCheck({
    //     "name": "Test Document",
    //     "width": 400,
    //
    // }
    // , {
    //     "name": "Test Document",
    //     "width": 400,
    //     "height": 400,
    //
    //     }
    // )

    let ovo = new OVOPaint(root, true);

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
    folder2.addNode(new ShapeLayerNode("Shape Layer 1"));
    doc.activeNode = layer;
    ovo.openDocument(doc);
    console.log(paintTools);
}

main().then(
    () => {
        console.log("Main finished");
    }
)
