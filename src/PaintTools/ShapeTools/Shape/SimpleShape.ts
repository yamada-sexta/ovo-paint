import {CanvasCtx, Shape, ShapeState} from "../../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {Vec2} from "../../../core/src/submodules/common-ts-utils/Math/Vector";

export type SimpleShapeType = "circle" | "rectangle" | "triangle" | "line" | "star" | "ellipse";

interface SimpleShapeState extends ShapeState {
    type: "simple"
    shapeType: SimpleShapeType;
    pos: Vec2;
    size: Vec2;
    fillStyle: string;
    strokeStyle: string;
    lineWidth: number;
}

const defaultState: SimpleShapeState = {
    type: "simple",
    shapeType: "rectangle",
    pos: [0, 0],
    size: [0, 0],
    fillStyle: "transparent",
    strokeStyle: "black",
    lineWidth: 1
}

export class SimpleShape extends Shape<SimpleShapeState> {
    _state: SimpleShapeState;

    constructor(pos: Vec2, size: Vec2, shapeType: SimpleShapeType = "rectangle", fillStyle: string = "transparent", strokeStyle: string = "black", lineWidth: number = 1) {
        super();
        this._state = {
            type: "simple",
            shapeType,
            pos,
            size,
            fillStyle,
            strokeStyle,
            lineWidth
        }
    }

    get pos(): Vec2 {
        return this._state.pos;
    }

    set pos(pos: Vec2) {
        this._state.pos = pos;
    }

    get size(): Vec2 {
        return this._state.size;
    }

    set size(size: Vec2) {
        this._state.size = size;
    }

    applyState(state: SimpleShapeState): void {
        this._state = state;
    }

    getState(): SimpleShapeState {
        return this._state;
    }

    renderTo(e: CanvasCtx): void {
        e.save();
        e.fillStyle = this._state.fillStyle;
        e.strokeStyle = this._state.strokeStyle;
        e.lineWidth = this._state.lineWidth;

        switch (this._state.shapeType) {
            case "rectangle":
                drawRect(e, this._state.pos, this._state.size);
                break;
            case "circle":
                drawCircle(e, this._state.pos, this._state.size);
                break;
            case "triangle":
                drawTriangle(e, this._state.pos, this._state.size);
                break;
            case "line":
                drawLine(e, this._state.pos, this._state.size);
                break;
            case "star":
                drawStar(e, this._state.pos, this._state.size);
                break;
            case "ellipse":
                drawEllipse(e, this._state.pos, this._state.size);
                break;
        }
        e.restore();

    }
}

function drawRect(ctx: CanvasCtx, pos: Vec2, size: Vec2) {
    ctx.beginPath();
    ctx.rect(pos[0], pos[1], size[0], size[1]);

    ctx.fill();
    ctx.stroke();
}

function drawCircle(ctx: CanvasCtx, pos: Vec2, size: Vec2) {
    const center = [pos[0] + size[0] / 2, pos[1] + size[1] / 2];
    const radius = Math.abs(
        Math.max(size[0], size[1]) / 2
    );

    ctx.beginPath();
    ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();
}

function drawTriangle(ctx: CanvasCtx, pos: Vec2, size: Vec2) {
    ctx.beginPath();
    ctx.moveTo(pos[0], pos[1] + size[1]);
    ctx.lineTo(pos[0] + size[0] / 2, pos[1]);
    ctx.lineTo(pos[0] + size[0], pos[1] + size[1]);
    ctx.lineTo(pos[0], pos[1] + size[1]);

    ctx.fill();
    ctx.stroke();
}

function drawLine(ctx: CanvasCtx, pos: Vec2, size: Vec2) {
    ctx.beginPath();
    ctx.moveTo(pos[0], pos[1]);
    ctx.lineTo(pos[0] + size[0], pos[1] + size[1]);

    ctx.fill();
    ctx.stroke();
}

function drawStar(ctx: CanvasCtx, pos: Vec2, size: Vec2) {
    const center = [pos[0] + size[0] / 2, pos[1] + size[1] / 2];
    const radius = Math.min(size[0], size[1]) / 2;
    const radius2 = radius / 2;
    ctx.beginPath();
    ctx.moveTo(center[0], center[1] - radius);
    ctx.lineTo(center[0] + radius2, center[1] - radius2);
    ctx.lineTo(center[0] + radius, center[1]);
    ctx.lineTo(center[0] + radius2, center[1] + radius2);
    ctx.lineTo(center[0], center[1] + radius);
    ctx.lineTo(center[0] - radius2, center[1] + radius2);
    ctx.lineTo(center[0] - radius, center[1]);
    ctx.lineTo(center[0] - radius2, center[1] - radius2);
    ctx.lineTo(center[0], center[1] - radius);

    ctx.fill();
    ctx.stroke();
}

function drawEllipse(ctx: CanvasCtx, pos: Vec2, size: Vec2) {
    const center = [pos[0] + size[0] / 2, pos[1] + size[1] / 2];
    const radiusX = Math.abs(size[0] / 2);
    const radiusY = Math.abs(size[1] / 2);
    ctx.beginPath();
    ctx.ellipse(center[0], center[1],
        radiusX, radiusY
        , 0, 0, 2 * Math.PI);

    ctx.fill();
    ctx.stroke();
}
