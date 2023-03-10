import {Shape} from "../../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {Vec2} from "../../../core/src/submodules/common-ts-utils/Math/Vector";

type TextState = {
    content: string;
    font: string;
    fontSize: number;
    position: Vec2;
}

export class TextShape extends Shape<TextState> {

    width: number;
    height: number;
    _state: TextState;

    getState(): TextState {
        return this._state
    }
    applyState(state: TextState): void {
        this._state = state;
        this.updateSize();
    }

    set content(value: string) {
        this._state.content = value;
        this.updateSize();
    }

    get content(): string {
        return this._state.content;
    }

    updateSize() {
        [this.width, this.height] = this.getSize();
    }

    getSize(): Vec2 {
        let canvas = new OffscreenCanvas(1, 1);
        let ctx = canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        ctx.font = `${this.fontSize}px ${this.font}`;
        let metrics = ctx.measureText(this.content);
        let height = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
        let width = metrics.width;
        return [width, height];
    }

    get fontSize(): number {
        return this._state.fontSize;
    }
    set fontSize(value: number) {
        this._state.fontSize = value;
        this.updateSize();
    }

    getFont(font: string) {
        let link = document.createElement("link") as HTMLLinkElement;
        let fontName = font.split(" ").join("+");

        let url = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;

        // let success = false;

        fetch(url).then((res) => {
            if (res.status === 200) {
                console.log("Font loaded")
                res.text().then(
                    (text) => {
                        link.href = url;
                        link.rel = "stylesheet";
                        document.head.appendChild(link);
                    }
                )
            }
        }).catch((e) => {
            console.log(e);
        });
        this.updateSize();
    }

    get font(): string {
        return this._state.font;
    }

    set font(value: string) {
        this._state.font = value;
        this.getFont(value);
    }

    constructor(content: string, position: Vec2, font: string, size: number) {
        super();
        const state: TextState = {
            content: content,
            font: font,
            fontSize: size,
            position: position
        };
        this._state = state;
        [this.width, this.height] = this.getSize();
    }

    renderTo(e: OffscreenCanvasRenderingContext2D): void {
        e.fillStyle = "black";
        e.font = `${this.fontSize}px ${this.font}`;
        this.drawText(this.content, e);
    }

    drawText(content: string, e: OffscreenCanvasRenderingContext2D): void {
        e.fillStyle = "black";
        e.font = `${this.fontSize}px ${this.font}`;
        const lines = content.split("\n");
        for (let i = 0; i < lines.length; i++) {
            e.fillText(lines[i], this.position[0], this.position[1] + i * this.fontSize);
        }
    }

    get position(): Vec2 {
        return this._state.position;
    }
    set position(value: Vec2) {
        this._state.position = value;
    }
}
