import {CanvasCtx, Shape, ShapeState} from "../../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";

export interface ScriptShapeState extends ShapeState {
    type: "script";
    script: string;
    width: number;
    height: number;
}

export class ScriptShape extends Shape {
    protected _state: ScriptShapeState;
    protected _canvas: OffscreenCanvas;
    protected _ctx: OffscreenCanvasRenderingContext2D;
    constructor(state: ScriptShapeState) {
        super();
        this._state = state;
        this._canvas = new OffscreenCanvas(this._state.width, this._state.height);
        this._ctx = this._canvas.getContext("2d") as OffscreenCanvasRenderingContext2D;
        this.applyState(state);
    }

    set script(script: string) {
        this._state.script = script;
    }

    get script(): string {
        return this._state.script;
    }

    get width(): number {
        return this._state.width;
    }

    get height(): number {
        return this._state.height;
    }

    set width(width: number) {
        this._state.width = width;
    }

    set height(height: number) {
        this._state.height = height;
    }

    applyState(state: ShapeState): void {
        if (state.type !== "script") {
            throw new Error("Invalid state type");
        }
        this._state = state as ScriptShapeState;
        this._canvas.width = this._state.width;
        this._canvas.height = this._state.height;
        this.renderScriptTo(this._ctx);

    }

    renderScriptTo(ctx:OffscreenCanvasRenderingContext2D){
        const script = this._state.script;
        const fn = new Function("ctx", script);
        console.log(fn);
        fn(ctx);
    }

    getState(): ShapeState {
        return this._state;
    }

    renderTo(e: CanvasCtx): void {
        e.drawImage(this._canvas, 0, 0);
    }
}