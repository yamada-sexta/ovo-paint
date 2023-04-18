import * as AgPsd from "ag-psd";
import {BlendMode as PsdBlendMode} from "ag-psd";

import {DocSerializer} from "./DocSerializer";
import {OVODocument} from "../OVODocument";
import {DocNode} from "../DocNodes/DocNode";
import {GroupNode} from "../DocNodes/GroupNode";
import {BitmapLayerNode} from "../DocNodes/Layers/BitmapLayerNode";
import {ShapeLayerNode} from "../DocNodes/Layers/ShapeLayer/ShapeLayerNode";

// Convert dict should have a key type of GlobalCompositeOperation and a value type of BlendMode
const convertMap = new Map<GlobalCompositeOperation, PsdBlendMode>();
convertMap.set("source-over", "normal");
convertMap.set("source-in", "pass through");
convertMap.set("lighten", "lighten");
convertMap.set("darken", "darken");
convertMap.set("multiply", "multiply");
convertMap.set("screen", "screen");
convertMap.set("overlay", "overlay");
convertMap.set("color-dodge", "color dodge");
convertMap.set("color-burn", "color burn");
convertMap.set("hard-light", "hard light");
convertMap.set("soft-light", "soft light");
convertMap.set("difference", "difference");
convertMap.set("exclusion", "exclusion");
convertMap.set("hue", "hue");
convertMap.set("saturation", "saturation");
convertMap.set("color", "color");
convertMap.set("luminosity", "luminosity");

export class PsdSerializer extends DocSerializer {
    get extension(): string {
        return "psd";
    }

    async fromBlob(blob: Blob, name: string): Promise<OVODocument | null> {
        const psd = AgPsd.readPsd(await blob.arrayBuffer());
        console.log(psd);

        return null;
    }

    async toBlob(data: OVODocument): Promise<Blob> {
        const psdFile = ovoDocToPsd(data);
        const buffer = AgPsd.writePsd(psdFile);
        const blob = new Blob([buffer], {type: "image/psd"});
        console.log(`psd blob size: ${blob.size}`);
        return blob;
    }
}

function canvasBlendModeToPsdBlendMode(canvasBlendMode: GlobalCompositeOperation): PsdBlendMode {
    return convertMap.get(canvasBlendMode) || "normal";
}

function ovoDocToPsd(doc: OVODocument): AgPsd.Psd {
    const psdFile: AgPsd.Psd = {
        height: doc.height,
        width: doc.width
    }
    psdFile.children = doc.rootNode.children.map((child) => ovoNodeToPsdLayer(doc, child));
    return psdFile;
}

function ovoNodeToPsdLayer(doc: OVODocument, ovoNode: DocNode): AgPsd.Layer {
    const psdLayer: AgPsd.Layer = {
        left: ovoNode.offset[0],
        top: ovoNode.offset[1],
        blendMode: canvasBlendModeToPsdBlendMode(ovoNode.blendMode),
        opacity: ovoNode.transparency.onExport,
        transparencyProtected: false,
        hidden: false
    }

    if (ovoNode instanceof GroupNode) {
        psdLayer.children = ovoNode.children.map((child) => ovoNodeToPsdLayer(doc, child));
    } else if (ovoNode instanceof BitmapLayerNode) {
        const canvas = document.createElement("canvas");
        canvas.width = ovoNode.width;
        canvas.height = ovoNode.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Could not get 2d context from canvas");
        }
        ctx.drawImage(ovoNode.canvas, 0, 0);
        psdLayer.canvas = canvas;
    } else if (ovoNode instanceof ShapeLayerNode) {
        const canvas = document.createElement("canvas");
        canvas.width = doc.width;
        canvas.height = doc.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
            throw new Error("Could not get 2d context from canvas");
        }
        ovoNode.render({
            activeNode: ovoNode,
            reachActiveLayer: true,
            renderMode: "export",
            canvas,
            ctx
        });
        psdLayer.canvas = canvas;
    } else {
        throw new Error("Unknown node type");
    }

    return psdLayer;
}
