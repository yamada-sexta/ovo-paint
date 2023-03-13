import {GroupNode} from "../../core/src/Documents/DocNodes/GroupNode";
import {PaintTool, PaintToolUIRenderEvent} from "../PaintTool";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {br, div, iconBtn} from "../../UI/DOM/DOMFunctions";
import {BitmapLayerNode} from "../../core/src/Documents/DocNodes/Layers/BitmapLayerNode";
import {OVODocument} from "../../core/src/Documents/OVODocument";
import {statelessRefreshDocContextMenu} from "../../UI/DocUI/DocContextMenu/MasterDocContextMenu";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {currentTheme} from "../../UI/Themes";

export class GroupTool extends PaintTool<GroupNode> {

    groupNode: GroupNode | null = null;
    document: OVODocument | null = null;

    isCompatibleWithNode(node: DocNode): boolean {
        return node instanceof GroupNode;
    }

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
        menu.append(iconBtn(
            currentTheme.groupIconName,
            "New Group",
            () => {
                if (this.groupNode) {
                    this.groupNode.addNode(new GroupNode("New Group"));
                    statelessRefreshDocContextMenu();
                }
            }
        ))
        menu.append(br())
        menu.append(iconBtn(
            currentTheme.bitmapLayerIconName,
            "New Bitmap Layer",
            () => {
                if (this.groupNode) {
                    const width = this.document?.width ?? 100;
                    const height = this.document?.height ?? 100;
                    this.groupNode.addNode(new BitmapLayerNode(width, height));
                    statelessRefreshDocContextMenu();
                }
            }
        ))
        menu.append(br())
        menu.append(iconBtn(
            currentTheme.shapeLayerIconName,
            "New Shape Layer",
            () => {
                if (this.groupNode) {
                    this.groupNode.addNode(new ShapeLayerNode("New Shape Layer"));
                    statelessRefreshDocContextMenu();
                }

            }
        ))
        menu.append(br())
        menu.append(iconBtn(
            currentTheme.deleteIconName,
            "Delete",
            () => {
                if (this.groupNode) {
                    if (this.document) {
                        this.document.removeNode(this.groupNode);
                    }
                    statelessRefreshDocContextMenu();
                }
            }
        ))


        return menu;
    }

}
