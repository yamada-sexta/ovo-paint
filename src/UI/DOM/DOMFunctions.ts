import {currentTheme} from "../Themes";

export const baseClass = "ovo-ui";

export function div(
    props?: {
        id?: string,
        className?: string,
        children?: HTMLElement[],
        style?: CSSStyleDeclaration[]
    }
) {
    let div = document.createElement("div");
    div.classList.add(baseClass);
    if (!props) {
        return div;
    }
    if (props.id) {
        div.id = props.id;
    }
    if (props.className) {
        div.className = props.className;
    }
    if (props.children) {
        for (let child of props.children) {
            div.appendChild(child);
        }
    }
    if (props.style) {
        for (let key of Object.keys(props.style)) {
            // @ts-ignore
            div.style[key] = props.style[key];
        }
    }

    return div;
}

export function br() {
    let out = document.createElement("br");
    out.classList.add(baseClass);
    return out;
}

export function label(
    props: {
        text: string,
        children?: HTMLElement[]
    }) {
    let label = document.createElement("label");
    label.style.color = currentTheme.text;

    label.classList.add(baseClass);
    label.innerText = props.text;
    if (props.children) {
        for (let child of props.children) {
            label.appendChild(child);
        }
    }
    return label;
}

export function input(props: {
    description?: string,
    type: string,
    value: string,
    onchange?: (e: Event) => void
}) {
    let input = document.createElement("input");
    input.classList.add(baseClass);
    input.style.color = currentTheme.text;
    input.style.backgroundColor = currentTheme.background;
    input.style.borderColor = currentTheme.border;
    input.style.borderStyle = "solid";
    input.style.borderWidth = "1px";
    input.style.outline = "none";
    input.onclick = (e) => {
        input.style.borderColor = currentTheme.selected;
    }
    input.onblur = (e) => {
        input.style.borderColor = currentTheme.border;
    }

    input.type = props.type;
    input.value = props.value;
    if (props.description) {
        input.title = props.description;
    }
    if (props.onchange) {
        input.addEventListener("change", props.onchange)
    }
    return input;
}

export function button(
    props: {
        text: string,
        onclick: () => void
    }
) {
    let button = document.createElement("button");
    button.classList.add(baseClass);
    button.innerText = props.text;
    button.onclick = props.onclick;
    return button;
}

export function select(
    props: {
        children: HTMLOptionElement[]
    }
) {
    let select = document.createElement("select");
    select.classList.add(baseClass);
    select.style.color = currentTheme.text;
    select.style.borderColor = currentTheme.border;
    select.style.backgroundColor = currentTheme.background;
    for (let child of props.children) {
        select.appendChild(child);
    }
    return select;
}

export function option(
    props: {
        text: string,
        value: string
    }
) {
    let option = document.createElement("option");
    option.classList.add(baseClass);
    option.innerText = props.text;
    option.value = props.value;
    return option;
}

export function colorPicker(
    props: {
        value?: string,
        onchange?: (e: Event) => void

    }) {
    let input = document.createElement("input");
    input.classList.add(baseClass);
    input.style.color = currentTheme.text;
    input.style.backgroundColor = currentTheme.background;
    input.style.borderColor = currentTheme.border;
    input.style.borderStyle = "solid";
    input.style.borderWidth = "1px";
    input.style.outline = "none";
    input.onclick = (e) => {
        input.style.borderColor = currentTheme.selected;
    }
    input.onblur = (e) => {
        input.style.borderColor = currentTheme.border;
    }

    input.type = "color";
    if (props.value) {
        input.value = props.value;
    }

    input.addEventListener("change", (e) => {
        if (props.onchange) {
            props.onchange(e);
        }
    })
    return input;
}

export function text(
    text: string
) {
    let textElement = document.createElement("label");
    textElement.style.color = currentTheme.text;
    textElement.classList.add(baseClass);
    // textElement.style.pointerEvents = "none";
    // textElement.onselectstart = () => false;
    textElement.innerText = text;
    return textElement;
}

export function iconBtn(
    iconName: string,
    btnText: string,
    onclick: () => void
) {
    let btn = button({
        text: "",
        onclick: onclick
    });
    const size = "16px";
    btn.classList.add("icon-btn");
    const icon = mdIcon(iconName);
    icon.style.fontSize = size;
    icon.style.marginRight = "5px";
    btn.appendChild(icon);
    const textElement = text(btnText);
    textElement.style.fontSize = size;
    textElement.style.marginLeft = "5px";
    btn.appendChild(textElement);
    btn.onclick = onclick;

    btn.style.color = currentTheme.text;
    btn.style.backgroundColor = currentTheme.background;
    btn.style.borderColor = currentTheme.border;
    btn.style.borderStyle = "solid";
    btn.style.borderWidth = "1px";
    btn.style.outline = "none";

    btn.onmouseover = (e) => {
        btn.style.backgroundColor = currentTheme.hover;
    }
    btn.onmouseout = (e) => {
        btn.style.backgroundColor = currentTheme.background;
    }


    return btn;
}

export function mdIcon(
    iconName: string, size: number = 24
) {
    const icon = document.createElement("span");
    icon.classList.add("material-symbols-outlined");
    icon.style.fontSize = size + "px";
    // icon.classList.add(baseClass);
    icon.innerText = iconName.toLowerCase().replace(/ /g, "_");
    icon.style.color = currentTheme.icon;
    return icon;
}
