import {div, input, option, text} from "./DOMFunctions";

interface DraggableNumOptions {
    min?: number;
    max?: number;
    step?: number;
    value?: number;
    doubleClickTime?: number;
    onchange?: (value: number) => void;
    ondragend?: (value: number) => void;
}

const defaultOptions: DraggableNumOptions = {
    min: 0,
    max: Math.pow(2, 32),
    step: 1,
    value: 0,
    doubleClickTime: 300,
    onchange: () => {
    },
    ondragend: () => {
    },
}

export function draggableNum(prop?: DraggableNumOptions) {
    const options = {...defaultOptions, ...prop}
    const frame = text("");
    let value = options.value || 0;

    const dragText = text("");
    const textInput = input({
        type: "number",
        value: value + "",
    });

    setText(value)
    dragText.draggable = true;
    dragText.style.cursor = "ew-resize";
    dragText.style.userSelect = "none";
    let lastX = 0;

    let doubleClick = false

    function setText(val: number) {
        if (val % 1 == 0) {
            dragText.textContent = val + "";
            textInput.value = val + "";
        } else {
            dragText.textContent = value.toFixed(2) + "";
            textInput.value = value.toFixed(2) + "";
        }
    }

    textInput.onchange = (e) => {
        value = parseFloat(textInput.value);
        setText(value);
        if (options.onchange) {
            options.onchange(value);
        }
    }

    textInput.onblur = (e) => {
        setToDragText();
    }

    textInput.onkeydown = (e) => {
        if (e.key == "Enter") {
            setToDragText();
        }
    }

    function setToDragText() {
        frame.innerHTML = "";

        frame.append(dragText);
    }

    function setToInput() {
        frame.innerHTML = "";
        frame.append(textInput);
    }

    dragText.onclick = (e) => {
        if (doubleClick) {
            setToInput();
        }
        console.log(doubleClick)
        doubleClick = true;
        setTimeout(() => {
            doubleClick = false;
        }, options.doubleClickTime)
    }

    dragText.ondragstart = (e) => {
        if (e.dataTransfer)
            dragText.style.opacity = "0";
        setTimeout(() => {
            dragText.style.opacity = "1";
        })
        lastX = e.clientX;
    }
    dragText.ondrag = (e) => {
        e.preventDefault();
        if (e.buttons == 0) {
            return;
        }

        let diff = e.clientX - lastX;
        if (options.step) {
            diff = Math.round(diff / options.step);
        }
        value += diff;

        if (options.min != undefined) {
            if (value < options.min) {
                value = options.min;
            }
        }
        if (options.max != undefined) {
            if (value > options.max) {
                value = options.max;
            }
        }

        setText(value)

        if (options.onchange) {
            options.onchange(value);
        }
        lastX = e.clientX;
    }

    dragText.ondragend = (e) => {
        e.preventDefault();
        if (options.ondragend) {
            options.ondragend(value);
        }

    }

    dragText.ondrop = (e) => {
        return false;
    }

    frame.append(dragText);

    return frame;
}