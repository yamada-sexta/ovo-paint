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

export function text(
    text: string
) {
    let textElement = document.createElement("span");
    textElement.classList.add(baseClass);
    textElement.innerText = text;
    return textElement;
}
