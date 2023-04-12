import {OVODocument} from "../Core/Documents/OVODocument";
import {br, button, div, input, label, text} from "./DOM/DOMFunctions";
import {openPopUp} from "./OpenPopUp";
import {currentTheme} from "./Themes";

const templateOptions = [
    {
        name: "4K",
        width: 3840,
        height: 2160
    },
    {
        name: "1080p",
        width: 1920,
        height: 1080
    },
    {
        name: "A4 Portrait",
        width: 210,
        height: 297
    },
    {
        name: "A4 Landscape",
        width: 297,
        height: 210
    },
    {
        name: "A3 Portrait",
        width: 297,
        height: 420
    },
    {
        name: "A3 Landscape",
        width: 420,
        height: 297
    },

    {
        name: "100x100",
        width: 100,
        height: 100
    },
    {
        name: "128x128",
        width: 128,
        height: 128
    },
    {
        name: "256x256",
        width: 256,
        height: 256
    }
];

interface CreateCallback {
    name: string;
    width: number;
    height: number;
}

export async function openCreateWindow(
    windowWidth: number = 300,
    windowHeight: number = 300
): Promise<OVODocument> {
    return new Promise<OVODocument>((resolve, reject) => {
        function finish(name: string, width: number, height: number) {
            if (name === "") {
                reject("Name cannot be empty");
                return;
            }
            if (width <= 0) {
                reject("Width must be greater than 0");
                return;
            }
            if (height <= 0) {
                reject("Height must be greater than 0");
                return;
            }
            if (createWindow) {
                createWindow.close();
            }
            resolve(
                new OVODocument(
                    name,
                    width,
                    height
                )
            );
        }


        const createDiv = getCreateDiv({createCallback: finish, errorCallback: errorCallback});

        const createWindow = openPopUp("Create New Document", windowWidth, windowHeight, createDiv);


        function errorCallback(error: string) {
            createWindow?.alert(error)
        }

        (createWindow as any).callback = finish;
        if (!createWindow) {
            reject("Could not open window");
            return;
        }
        createWindow.document.body.style.backgroundColor = currentTheme.background;
    });
}


function getCreateDiv(props: {
    createCallback: (name: string, width: number, height: number) => void,
    errorCallback: (error: string) => void
}) {

    let title = text("Create New Document");

    let templateDropdown = document.createElement("select");


    for (let option of templateOptions) {
        let optionElement = document.createElement("option");
        optionElement.innerText = option.name;
        optionElement.value = option.name;
        templateDropdown.appendChild(optionElement);
    }

    let templateLabel = document.createElement("label");
    templateLabel.innerText = "Template: ";
    templateLabel.appendChild(templateDropdown);

    const nameInput = input(
        {
            type: "text",
            value: "Untitled"
        }
    )
    const nameLabel = label(
        {
            text: "Name: ",
            children: [nameInput]
        }
    )

    let widthInput = input(
        {
            type: "number",
            value: "100"
        }
    )
    let widthLabel = label(
        {
            text: "Width: ",
            children: [widthInput]
        }
    )

    let heightInput = input(
        {
            type: "number",
            value: "100"
        }
    )
    let heightLabel = label(
        {
            text: "Height: ",
            children: [heightInput]
        }
    )

    let scaleInput = input(
        {
            type: "number",
            value: "1"
        }
    )

    let scaleLabel = label(
        {
            text: "Scale: ",
            children: [scaleInput]
        }
    )
    let createBtn = button(
        {
            text: "Create",
            onclick: () => {
                let name = nameInput.value;
                let width = parseInt(widthInput.value);
                let height = parseInt(heightInput.value);
                let scale = parseFloat(scaleInput.value);
                if (name === "") {
                    props.errorCallback("Name cannot be empty");
                    return;
                }
                if (width <= 0) {
                    props.errorCallback("Width must be greater than 0");
                    return;
                }
                if (height <= 0) {
                    props.errorCallback("Height must be greater than 0");
                    return;
                }
                if (isNaN(width)) {
                    props.errorCallback("Width must be a number");
                    return;
                }
                if (isNaN(height)) {
                    props.errorCallback("Height must be a number");
                    return;
                }
                if (isNaN(scale)) {
                    props.errorCallback("Scale must be a number");
                    return;
                }
                width *= scale;
                height *= scale;
                if (width > 10000 || height > 10000) {
                    props.errorCallback("Width and height cannot be greater than 10000");
                    return;
                }
                props.createCallback(name, width, height);
            }
        }
    )

    let templateDropdownChange = () => {
        let option = templateOptions.find((option) => option.name === templateDropdown.value);
        if (option) {
            widthInput.value = option.width.toString();
            heightInput.value = option.height.toString();
        }
    }
    templateDropdown.onchange = templateDropdownChange;

    templateDropdownChange();
    const out = div(
        {
            children: [
                title,
                br(),
                templateLabel,
                br(),
                nameLabel,
                br(),
                widthLabel,
                br(),
                heightLabel,
                br(),
                scaleLabel,
                br(),
                createBtn
            ]
        }
    );
    out.style.textAlign = "center";
    out.style.backgroundColor = currentTheme.background;
    out.style.color = currentTheme.text;
    // out.style.padding = "10px";
    out.style.width = "100%";
    out.style.height = "100%";

    return out
}
