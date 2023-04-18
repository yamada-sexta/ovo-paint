import {OVODocument} from "../OVODocument";
import {DocSerializer} from "./DocSerializer";
import {docToJsonV1} from "./OvoJsonV1/DocToJsonV1";
import {jsonToDocV1} from "./OvoJsonV1/DictToDocV1";

function jsonStrToWarpedJson(jsonStr: string, warpLen: number = 30): string {
    let newStr = "";
    let i = 0;
    while (i < jsonStr.length) {
        newStr += jsonStr.substring(i, i + warpLen) + "\n";
        i += warpLen;
    }
    return newStr;
}
export class OvoJsonSerializer extends DocSerializer {
    get extension(): string {
        return "ovojson";
    }

    async fromBlob(blob: Blob, name: string): Promise<OVODocument | null> {
        const str = await blob.text();
        const lines = str.split("\n");
        let jsonStr = lines.join("");

        const doc = await jsonToDocV1(jsonStr);
        return doc;
    }

    async toBlob(data: OVODocument): Promise<Blob> {
        // let str = headerStr + "\n";
        const jsonStr = await docToJsonV1(data);
        const wJsonStr = jsonStrToWarpedJson(jsonStr); // jsonStr;

        return new Blob([wJsonStr], {type: "text/plain"});
    }
}

