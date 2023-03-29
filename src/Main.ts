import {OVOPaint} from "./OVOPaint";
import {paintTools} from "./PaintTools/PaintTools";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {BitmapLayerNode} from "./core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {GroupNode} from "./core/src/Documents/DocNodes/GroupNode";
import {ShapeLayerNode} from "./core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";



async function main() {
    let root = document.getElementById("ovo-root") as HTMLDivElement;
    let ovo = new OVOPaint(root, true);

    // TEST
    const width = 212;
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

    // layer.createSnapshot();
    // doc.stageChange(layer);
    doc.activeNode = layer;
    // ovo.openDocument(doc);
    console.log(paintTools);
}

main().then(
    () => {
    console.console.log("Main finished");
    
    }
)
