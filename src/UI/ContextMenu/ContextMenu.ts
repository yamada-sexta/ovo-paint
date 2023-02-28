import {div} from "../DOMFunctions";

export interface ContextMenuObject {
    getContextMenu: () => HTMLElement;
}

type  verticalAlignment = "top" | "bottom" | "center";
type horizontalAlignment = "left" | "right" | "center";

export class ContextMenu {
    _contentFrame: HTMLElement;
    _root: HTMLElement;

    horizontalAlignment: horizontalAlignment;
    verticalAlignment: verticalAlignment;

    constructor(pos: [number, number],
                horizontalAlignment: horizontalAlignment = "left",
                verticalAlignment: verticalAlignment = "top",
                content: HTMLElement = div(),
                root: HTMLElement = document.body) {
        this._root = root;
        const menu = div();
        menu.style.position = "absolute";
        menu.style.left = "0px";
        menu.style.top = "0px";
        menu.style.backgroundColor = "white";
        menu.style.boxShadow = "0 0 3px rgba(0,0,0,0.5)";
        menu.style.padding = "5px";
        // menu.style.zIndex = "1000";
        menu.style.visibility = "hidden";
        menu.append(content);
        this._contentFrame = menu;
        root.append(menu);


        this.horizontalAlignment = horizontalAlignment;
        this.verticalAlignment = verticalAlignment;
    }

    close() {
        // this._root.removeChild(this._contentFrame);
        this._contentFrame.style.visibility = "hidden";
    }

    set pos(pos: [number, number]) {
        let scrollPos = [window.scrollX, window.scrollY];

        let thisPos = [pos[0], pos[1]];
        switch (this.horizontalAlignment) {
            case "left":
                break;
            case "right":
                thisPos[0] -= this._contentFrame.clientWidth;
                break;
            case "center":
                thisPos[0] -= this._contentFrame.clientWidth / 2;
                break;
        }

        switch (this.verticalAlignment) {
            case "top":
                break;
            case "bottom":
                thisPos[1] -= this._contentFrame.clientHeight;
                break;
            case "center":
                thisPos[1] -= this._contentFrame.clientHeight / 2;
                break;
        }

        this._contentFrame.style.left = thisPos[0] + scrollPos[0] + "px";
        this._contentFrame.style.top = thisPos[1] + scrollPos[1] + "px";

    }

    get pos(): [number, number] {
        return [parseInt(this._contentFrame.style.left), parseInt(this._contentFrame.style.top)];
    }

    set content(content: HTMLElement) {
        this._contentFrame.innerHTML = "";
        this._contentFrame.append(content);
    }

    get content(): HTMLElement {
        return this._contentFrame;
    }

    open() {
        const menu = this._contentFrame;
        menu.oncontextmenu = (e) => {
            return false;
        }
        setTimeout(() => {
            menu.oncontextmenu = (e) => {

            }
        }, 100);

        this._contentFrame.style.visibility = "visible";
    }
}
