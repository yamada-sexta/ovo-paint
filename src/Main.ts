import {OVOUIManager} from "./UI/OVOUIManager";
import {DraggableWindow} from "./UI/DraggableWindow";
import {baseClass, div, text} from "./UI/DOMFunctions";
import * as monaco from "monaco-editor";
import {OVOPaint} from "./OVOPaint";
import {showTempMessage} from "./UI/MessageBox/Message";
import {PaintToolPreviewCanvas} from "./UI/PaintToolUI/PaintToolDemoCanvas";
import {initializeUIDependencyOn} from "./UI/InitializeUIDependency";
import {paintTools} from "./PaintTools/PaintTools";

function tmp(){
    const testJSON = `{
    "name": "Testfiijewifphgvwrejkvdslnj kbhrjwiepqowk",
    "age": 20
    }`
    let lines = testJSON.split("\n");
    let newLines = [];
    for (let i = 0; i < lines.length; i++) {
        // if the line only contains whitespace, skip it
        if (lines[i].trim().length === 0){
            continue;
        }
        let currLine = lines[i].trim();
        console.log(currLine);
        const warpLength = 2;
        if (currLine.length > warpLength){
            // split the line so that all length are less than warpLength
            let line = currLine;
            while (line.length > warpLength){
                newLines.push(line.substring(0, warpLength));
                line = line.substring(warpLength);
            }
            newLines.push(line);

        }
        else {
            newLines.push(currLine);
        }
    }

    console.log( "newlines: "+newLines.join("\n"));

    console.log(testJSON)
    const testObj = JSON.parse(testJSON);
    console.log(testObj);
    const testObj2 = JSON.parse(newLines.join(""));
    console.log(testObj2);
}
function main() {
    tmp();
    let root = document.getElementById("ovo-root") as HTMLDivElement;

    initializeUIDependencyOn();



    root.style.overflow = "hidden";

    let ovo = new OVOPaint(root, true);
    console.log(paintTools);
}

main()
