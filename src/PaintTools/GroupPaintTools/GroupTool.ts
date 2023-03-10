import {GroupNode} from "../../core/src/Documents/DocNodes/GroupNode";
import {PaintTool, PaintToolUIRenderEvent} from "../PaintTool";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {button, div} from "../../UI/DOM/DOMFunctions";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {OVODocument} from "../../core/src/Documents/OVODocument";
import {
    refreshDocContextMenu,
    statelessRefreshDocContextMenu
} from "../../UI/DocUI/DocContextMenu/MasterDocContextMenu";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";

export class GroupTool extends PaintTool<GroupNode> {

    isCompatibleWithNode(node: DocNode): boolean {
        return node instanceof GroupNode;
    }

    groupNode: GroupNode | null = null;
    document: OVODocument | null = null;

    onSelect(e: { node: GroupNode, doc: OVODocument }) {
        this.groupNode = e.node;
        this.document = e.doc;
    }

    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {
        await super.renderCanvasUI(e);
        if (e.dom) {
            e.dom.style.cursor = "default";
        }
    }

    getMenu(): HTMLElement {
        const menu = div();

        menu.append(button({
            text: "New Group",
            onclick: () => {
                if (this.groupNode) {
                    this.groupNode.addNode(new GroupNode("New Group"));
                    statelessRefreshDocContextMenu();
                }
            }
        }))

        menu.append(button({
            text: "New Bitmap Layer",
            onclick: () => {
                if (this.groupNode) {
                    const width = this.document?.width ?? 0;
                    const height = this.document?.height ?? 0;
                    this.groupNode.addNode(new BitmapLayerNode(width, height));
                    statelessRefreshDocContextMenu();
                }
            }
        }))

        menu.append(button({
            text: "New Shape Layer",
            onclick: () => {
                if (this.groupNode) {
                    const width = this.document?.width ?? 0;
                    const height = this.document?.height ?? 0;
                    this.groupNode.addNode(new ShapeLayerNode());
                    statelessRefreshDocContextMenu();
                }
            }
        }))

        return menu;
    }

}
