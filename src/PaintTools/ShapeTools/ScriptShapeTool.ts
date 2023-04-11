import {PaintTool} from "../PaintTool";
import {ShapePaintTool} from "./ShapePaintTool";
import {Shape} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/Shape";
import {Vec2} from "../../core/src/submodules/common-ts-utils/Math/Vector";
import {ScriptShape, ScriptShapeState} from "./Shape/ScriptShape";
import {PaintToolEvent} from "../../core/src/PaintToolEvent";
import {ShapeLayerNode} from "../../core/src/Documents/DocNodes/Layers/ShapeLayer/ShapeLayerNode";
import {br, div, iconBtn, input} from "../../UI/DOM/DOMFunctions";
import {draggableNum} from "../../UI/DOM/DraggableNum";
import {openCreateWindow} from "../../UI/DocumentCreateUI";
import {openPopUp} from "../../UI/OpenPopUp";
import {SimpleCodeMirror} from "../../ez-codemirror/src/ez-codemirror";
import {currentTheme} from "../../UI/Themes";

function defaultScript(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 100, 100);
}

function getDefaultScript() {
//     return the default script with out the name
    return defaultScript.toString().split("{")[1].split("}")[0];
}

async function openScriptEditor(){

    const frame = div()
    const editor = document.createElement("textarea")  as HTMLTextAreaElement;
    editor.style.width = "100%";
    editor.style.height = "100%";
    editor.style.color = currentTheme.text;
    editor.style.backgroundColor = currentTheme.background;
    editor.spellcheck = false;
    frame.appendChild(editor);
    openPopUp("Script Editor", 100,100, frame)
    return editor;
}

export class ScriptShapeTool extends ShapePaintTool {
    _state: ScriptShapeState = {
        type: "script",
        script: getDefaultScript(),
        width: 100,
        height: 100
    }

    shapeInRange(shape: Shape, pos: Vec2): boolean {
        return shape instanceof ScriptShape;
    }

    async onDown(e: PaintToolEvent<ShapeLayerNode>): Promise<void> {
        await super.onDown(e);
        console.log(getDefaultScript())
        if (!this.selectedShape) {
            const shape = new ScriptShape(
                this._state
            );
            e.node.shapes.push(shape);
        } else {
            this.selectedShape.applyState(this._state);
        }
    }

    getMenu(): HTMLElement {
        const menu = document.createElement("div");
        const scriptInput = input({
            type: "text",
            value: this._state.script,
            onchange: (e) => {
                if (e.target instanceof HTMLInputElement)
                    this._state.script = e.target.value;
            }
        });
        menu.appendChild(scriptInput);
        menu.appendChild(br())

        const editButton = iconBtn("edit",
            "Edit Script",
            async () => {
                const editor = await openScriptEditor();
                editor.value = this._state.script;
                editor.onchange = (e) => {
                    if (e.target instanceof HTMLTextAreaElement) {
                        this._state.script = e.target.value;
                    }
                }
            }
        );
        menu.appendChild(editButton);
        menu.appendChild(br())

        const widthInput = draggableNum({
            value: this._state.width,
            onchange: (e) => {
                this._state.width = e;
            }
        })
        menu.appendChild(widthInput);
        menu.appendChild(br())

        const heightInput = draggableNum({
            value: this._state.height,
            onchange: (e) => {
                this._state.height = e;
            }
        })

        menu.appendChild(heightInput);
        menu.appendChild(br())
        if (this.selectedShape) {
            const applyButton = iconBtn("check",
                "Apply",
                () => {
                    if (this.selectedShape) {
                        this.selectedShape.applyState(this._state);
                    }
                });
            menu.appendChild(applyButton);
        }

        return menu;
    }
}