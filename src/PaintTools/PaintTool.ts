import {PaintToolEvent} from "../core/src/PaintToolEvent";
import {DocNode} from "../core/src/Documents/DocNodes/DocNode";
import {DocUIState} from "../UI/DocUI/DocUIState";
import {IShortcut} from "../Shortcuts/ShortcutsChecker";
import {OVODocument} from "../core/src/Documents/OVODocument";

export interface PaintToolUIRenderEvent {
    ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
    canvas: HTMLCanvasElement | OffscreenCanvas;
    state: DocUIState;
    dom: HTMLElement | null;
    inDocRange: boolean;
}

export interface PaintToolUIKey extends IShortcut {
    pos: { x: number, y: number };
}

export abstract class PaintTool<NodeType extends DocNode = DocNode> {
    /**
     * Gets the menu for the tool
     * @returns {HTMLElement} The menu
     */
    getMenu(): HTMLElement {
        let item = document.createElement("div");
        item.innerText = "NO CONTENT";
        return item;
    }

    get name(): string {
        return this.constructor.name;
    }

    /**
     * Returns true if the tool is compatible with the given node
     * @param node
     */
    abstract isCompatibleWithNode(node: DocNode): boolean;

    /**
     * Called when pointer is down
     * @param e
     */
    async onDown(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    /**
     * Called when pointer is moved
     * @param e
     */
    async onMove(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    /**
     * Called when pointer is up
     * @param e
     */
    async onUp(e: PaintToolEvent<NodeType>): Promise<void> {

    }

    /**
     * Renders the UI for the tool on the canvas
     * @param e
     */
    async renderCanvasUI(e: PaintToolUIRenderEvent): Promise<void> {

    }

    /**
     * When a key is pressed
     * @param e
     */
    async onKeyDown(e: IShortcut): Promise<void> {

    }

    /**
     * When a key is released
     * @param e
     */
    async onKeyUp(e: IShortcut): Promise<void> {

    }

    /**
     * When a key is pressed
     * @param e
     */
    async onKeyPress(e: IShortcut): Promise<void> {

    }

    /**
     * When the tool is selected
     */
    onSelect(e: { node: NodeType, doc:OVODocument }): void {

    }
}
