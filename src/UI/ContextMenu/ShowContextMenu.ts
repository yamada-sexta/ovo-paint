import {div} from "../DOMFunctions";

export interface ContextMenuObject {
    getContextMenu: () => HTMLElement;
}

export class ContextMenu{
    _contentFrame: HTMLElement;
    _root: HTMLElement;

    constructor(pos:[number, number], content:HTMLElement, root: HTMLElement = document.body) {
        this._root = root;
        const menu = div();
        menu.style.position = "absolute";
        menu.style.left = "0px";
        menu.style.top = "0px";
        menu.style.backgroundColor = "white";
        menu.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
        menu.style.padding = "5px";
        // menu.style.zIndex = "1000";
        menu.style.visibility = "hidden";
        menu.append(content);
        this._contentFrame = menu;
        root.append(menu);



        if (menu.clientWidth + pos[0] > window.innerWidth) {
            menu.style.left = (pos[0] - menu.clientWidth) + "px";
        }
        if (menu.clientHeight + pos[1] > window.innerHeight) {
            menu.style.top = (pos[1] - menu.clientHeight) + "px";
        }
        console.log("menu", menu.clientWidth, menu.clientHeight, menu.style.left, menu.style.top)
    }

    close(){
        // this._root.removeChild(this._contentFrame);
        this._contentFrame.style.visibility = "hidden";
    }

    set pos(pos:[number, number]){
        // Get the scroll position
        // let scrollPos = [document.body.scrollLeft, document.body.scrollTop];

        let scrollPos = [window.scrollX, window.scrollY];
        console.log("scrollPos", scrollPos)

        this._contentFrame.style.left = pos[0] + scrollPos[0]+ "px";
        this._contentFrame.style.top = pos[1] + scrollPos[1] + "px";
        if (this._contentFrame.clientWidth + pos[0] > window.innerWidth) {
            this._contentFrame.style.left = (pos[0] - this._contentFrame.clientWidth) + "px";
        }
        if (this._contentFrame.clientHeight + pos[1] > window.innerHeight) {
            this._contentFrame.style.top = (pos[1] - this._contentFrame.clientHeight) + "px";
        }
    }

    get pos():[number, number]{
        return [parseInt(this._contentFrame.style.left), parseInt(this._contentFrame.style.top)];
    }

    set content(content:HTMLElement){
        this._contentFrame.innerHTML = "";
        this._contentFrame.append(content);
    }

    get content():HTMLElement{
        return this._contentFrame;
    }

    open(){
        const menu = this._contentFrame;
        menu.oncontextmenu = (e) => {
            // e.preventDefault();

            return false;
        }
        setTimeout(() => {
            menu.oncontextmenu = (e) => {

            }
        }, 100);

        this._contentFrame.style.visibility = "visible";
    }

}
