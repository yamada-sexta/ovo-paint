export class DraggableWindow {
    _root: HTMLElement;
    _content: HTMLElement;

    _relaDownPos: [number, number] | null = null;

    _titleBar: HTMLElement;

    constructor(pos: [number, number], content: HTMLElement, title: string = "New Window", root: HTMLElement = document.body) {
        this._root = root;
        this._content = content;

        let windowFrame = document.createElement("div");
        windowFrame.style.position = "absolute";
        windowFrame.style.top = pos[1] + "px";
        windowFrame.style.left = pos[0] + "px";
        windowFrame.style.width = "fit-content";
        windowFrame.style.height = "fit-content";
        windowFrame.style.backgroundColor = "black";
        windowFrame.style.border = "1px solid black";


        let titleBar = document.createElement("div");
        titleBar.innerText = title;
        titleBar.style.position = "absolute";
        titleBar.style.top = "0px";
        titleBar.style.left = "0px";
        titleBar.style.width = "100%";
        titleBar.style.minWidth = "100px";
        titleBar.style.height = "20px";
        titleBar.style.backgroundColor = "lightgray";
        titleBar.style.cursor = "move";
        this._titleBar = titleBar;

        root.addEventListener("mousedown", (e: MouseEvent) => {
                if (e.target == titleBar) {
                    this._relaDownPos = [e.offsetX - windowFrame.clientLeft, e.offsetY - windowFrame.clientTop];
                }
            }
        )

        root.addEventListener("mouseup", (e: MouseEvent) => {
            this._relaDownPos = null;

        });

        root.addEventListener("mousemove", (e: MouseEvent) => {
            if (this._relaDownPos) {
                windowFrame.style.top = (e.clientY - this._relaDownPos[1]) + "px";
                windowFrame.style.left = (e.clientX - this._relaDownPos[0]) + "px";
            }
        })

        let contentFrame = document.createElement("div");
        contentFrame.style.position = "absolute";
        contentFrame.style.top = "20px";
        contentFrame.style.left = "0px";
        contentFrame.style.width = "100%";
        contentFrame.style.height = "auto";
        contentFrame.style.backgroundColor = "white";

        contentFrame.appendChild(content);

        windowFrame.appendChild(titleBar);
        windowFrame.appendChild(contentFrame);
        this._root.appendChild(windowFrame);
    }
}