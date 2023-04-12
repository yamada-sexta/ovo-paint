import {OVOPaint} from "./OVOPaint";
import {paintTools} from "./PaintTools/PaintTools";
import {OVODocument} from "./Core/Documents/OVODocument";
import {BitmapLayerNode} from "./Core/Documents/DocNodes/Layers/BitmapLayerNode";
import {GroupNode} from "./Core/Documents/DocNodes/GroupNode";
import {ShapeLayerNode} from "./Core/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";


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

    doc.activeNode = layer;
    console.log(paintTools);
}

main().then(
    () => {
        console.log("Main finished");
    }
)
