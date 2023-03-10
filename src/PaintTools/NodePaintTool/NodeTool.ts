import {PaintTool} from "../PaintTool";
import {DocNode} from "../../core/src/Documents/DocNodes/DocNode";
import {OVODocument} from "../../core/src/Documents/OVODocument";
import {br, div, iconBtn, input} from "../../UI/DOM/DOMFunctions";
import {currentTheme} from "../../UI/Themes";
import {statelessRefreshDocContextMenu} from "../../UI/DocUI/DocContextMenu/MasterDocContextMenu";

export class NodeTool extends PaintTool {
    isCompatibleWithNode(node: DocNode): boolean {
        return true;
    }

    node: DocNode | null = null;
    document: OVODocument | null = null;

    onSelect(e: { node: DocNode, doc: OVODocument }) {
        this.node = e.node;
        this.document = e.doc;
    }

    getMenu(): HTMLElement {

        if (this.node === null) {
            return div();
        }
        if (this.document === null) {
            return div();
        }

        const frame = div();

        const name = input({
            type: "text",
            value: this.node?.name ?? "",
        })
        name.onchange = () => {
            if (this.node) {
                this.node.name = name.value;
                statelessRefreshDocContextMenu();
            }
        }
        frame.append(name);
        frame.append(br())
        frame.append(iconBtn(
            currentTheme.deleteIconName,
            "Delete",
            () => {
                if (this.node && this.document) {
                    this.document.removeNode(this.node);
                    statelessRefreshDocContextMenu();
                }
            }
        ))
        return frame;
    }
}
