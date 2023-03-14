import {OVOUIManager} from "./UI/OVOUIManager";
import {OVODocument} from "./core/src/Documents/OVODocument";
import {OvoJsonSerializer} from "./core/src/Documents/Serializers/OvoJsonSerializer";
import {initializeUIDependencyOn} from "./UI/InitializeUIDependency";
import {assets} from "./Assets/Assets";

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
            this.setPublic().then(r => {
            });
        }

        initializeUIDependencyOn();
    }

    /**
     * Exposes the OVO Paint API to the window.
     */
    async setPublic() {
        const qna = require('@tensorflow-models/qna');

        document.head.appendChild(document.createElement("script")).src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core";
        document.head.appendChild(document.createElement("script")).src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-converter";

        document.head.appendChild(document.createElement("script")).src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl";

        // const model = await (qna).load();
        const passage = assets.src_Assets_Help_MD;

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
            },
            help: async (question: string) => {
                // const answers = await model.findAnswers(question, passage);
                let answer = "";
                // if (answers.length > 0) {
                //     answer =answers[0].text;
                // } else {
                //     answer = "No answer found";
                // }
                // console.log(answer)
                return answer;
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
