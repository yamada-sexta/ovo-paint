import {OVOUIManager} from "./UI/OVOUIManager";
import {DraggableWindow} from "./UI/DraggableWindow";
import {div, text} from "./UI/DOMFunctions";
import * as monaco from "monaco-editor";
import {OVOPaint} from "./OVOPaint";

self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return './vs/language/json/json.worker.js';
        }
        if (label === 'css' || label === 'scss' || label === 'less') {
            return './vs/language/css/css.worker.js';
        }
        if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return './vs/language/html/html.worker.js';
        }
        if (label === 'typescript' || label === 'javascript') {
            return './vs/language/typescript/ts.worker.js';
        }
        return './vs/editor/editor.worker.js';
    }
};

function main() {
    let root = document.getElementById("ovo-root") as HTMLDivElement;
    let ovo = new OVOPaint(root, true);
    //
    // let div = document.createElement("div");
    // div.style.width = "100%";
    // div.style.height = "500px";
    // root.appendChild(div);

    // document.body.append(div);
    // let editor = monaco.editor.create(document.getElementById("container") as HTMLDivElement, {
    //     value: "function hello() { alert('Hello world!'); }",
    //     language: "javascript"
    // });
}

main()
