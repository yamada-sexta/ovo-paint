import {BitmapPaintTool} from "./BitmapPaintTool";
import {OVODocument} from "../../Core/Documents/OVODocument";
import {BitmapLayerNode} from "../../Core/Documents/DocNodes/Layers/BitmapLayerNode";
import {div, iconBtn, text} from "../../UI/DOM/DOMFunctions";

export class PasteTool extends BitmapPaintTool{
    _doc: OVODocument | null = null;
    onSelect(e: { node: BitmapLayerNode; doc: OVODocument }) {
        super.onSelect(e);
        this._doc = e.doc;
    }

    getMenu(): HTMLElement {
        const menu = div();
        menu.appendChild(iconBtn(
            "content_paste",
            "Paste",
            async () => {
                if (!this._doc) {
                    console.log("No document selected");
                    return;
                }

                const permission = await navigator.permissions.query({
                    // @ts-ignore
                    name: "clipboard-read",
                });
                if (permission.state === "denied") {
                    throw new Error("Not allowed to read clipboard.");
                }
                const clipboardContents = await navigator.clipboard.read();
                const blob = await clipboardContents[0].getType("image/png");
                const img = new Image();
                img.src = URL.createObjectURL(blob);
                img.onload = () => {
                    if (!this._doc) {
                        console.log("No document selected");
                        return;
                    }
                    if (this._doc._activeNode instanceof BitmapLayerNode){
                        this._doc._activeNode.ctx.drawImage(img, 0, 0);
                    }
                }

            }
        ));
        return menu;
    }
}