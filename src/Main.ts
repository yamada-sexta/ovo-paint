import {OVOUIManager} from "./UI/OVOUIManager";
import {DraggableWindow} from "./UI/Tmp/DraggableWindow";
import {baseClass, div, text} from "./UI/DOM/DOMFunctions";
import {OVOPaint} from "./OVOPaint";
import {showTempMessage} from "./UI/MessageBox/Message";
import {PaintToolPreviewCanvas} from "./UI/PaintToolUI/PaintToolDemoCanvas";
import {initializeUIDependencyOn} from "./UI/InitializeUIDependency";
import {paintTools} from "./PaintTools/PaintTools";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {BitmapLayerNode} from "./core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {GroupNode} from "./core/src/Documents/DocNodes/GroupNode";
import {ShapeLayerNode} from "./core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";

function tmp() {
    const testJSON = `{
    "name": "Testfiijewifphgvwrejkvdslnj kbhrjwiepqowk",
    "age": 20
    }`
    let lines = testJSON.split("\n");
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        // if the line only contains whitespace, skip it
        if (lines[i].trim().length === 0) {
            continue;
        }
        let currLine = lines[i].trim();
        console.log(currLine);
        const warpLength = 2;
        if (currLine.length > warpLength) {
            // split the line so that all length are less than warpLength
            let line = currLine;
            while (line.length > warpLength) {
                newLines.push(line.substring(0, warpLength));
                line = line.substring(warpLength);
            }
            newLines.push(line);

        } else {
            newLines.push(currLine);
        }
    }

    console.log("newlines: " + newLines.join("\n"));

    console.log(testJSON)
    const testObj = JSON.parse(testJSON);
    console.log(testObj);
    const testObj2 = JSON.parse(newLines.join(""));
    console.log(testObj2);
}

async function main() {
    // tmp();
    let root = document.getElementById("ovo-root") as HTMLDivElement;

    initializeUIDependencyOn();
    // root.style.overflow = "hidden";

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
