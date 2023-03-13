import {div} from "../../DOM/DOMFunctions";
import {currentTheme} from "../../Themes";

type VerticalAlignment = "top" | "bottom" | "center";
type HorizontalAlignment = "left" | "right" | "center";

export class ContextMenu {
    frame: HTMLElement;

    constructor(content: HTMLElement,
                pos: [number, number],
                horizontalAlignment: HorizontalAlignment,
                verticalAlignment: VerticalAlignment,
                root: HTMLElement = document.body) {
        this.frame = div();
        this.createMenu(content, root);
        this.setPos(pos, horizontalAlignment, verticalAlignment)
    }

    close() {
        this.frame.remove();
    }

    private createMenu(content: HTMLElement, root: HTMLElement = document.body) {
        const menu = div();
        menu.style.position = "absolute";
        menu.style.left = "0px";
        menu.style.top = "0px";
        menu.style.backgroundColor = "white";
        menu.style.boxShadow = "0 0 3px rgba(0,0,0,0.5)";
        menu.style.padding = "10px";
        menu.style.backgroundColor = currentTheme.background;
        // menu.style.zIndex = "1000";
        // menu.style.visibility = "hidden";
        menu.append(content);
        this.frame = menu;
        root.append(menu);
    }

    private setPos(pos: [number, number], horizontalAlignment: HorizontalAlignment,
                   verticalAlignment: VerticalAlignment,) {
        let scrollPos = [window.scrollX, window.scrollY];

        let thisPos = [pos[0], pos[1]];
        switch (horizontalAlignment) {
            case "left":
                break;
            case "right":
                thisPos[0] -= this.frame.clientWidth;
                break;
            case "center":
                thisPos[0] -= this.frame.clientWidth / 2;
                break;
        }

        switch (verticalAlignment) {
            case "top":
                break;
            case "bottom":
                thisPos[1] -= this.frame.clientHeight;
                break;
            case "center":
                thisPos[1] -= this.frame.clientHeight / 2;
                break;
        }
        this.frame.style.left = thisPos[0] + scrollPos[0] + "px";
        this.frame.style.top = thisPos[1] + scrollPos[1] + "px";
    }
}
