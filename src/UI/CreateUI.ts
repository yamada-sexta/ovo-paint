import {OVODocument} from "../core/src/Documents/OVODocument";

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
        let createWindow = window.open("", "", `width=${windowWidth},height=${windowHeight}`);
        if (!createWindow) {
            reject("Could not open window");
            return;
        }

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

        (createWindow as any).callback = finish;
        if (!createWindow) {
            reject("Could not open window");
            return;
        }

        let createDiv = getCreateDiv(finish);

        createWindow.document.body.append(createDiv);
        //
        // createWindow.document.write(`
        //         <html>
        //             <head>
        //                 <title>Create Document</title>
        //             </head>
        //             <body>
        //                 <div>Create New Document</div>
        //
        //                 <div>Name: <input type="text" id="name" value="Untitled"></div>
        //                 <div>Width: <input type="number" id="width" value="${defaultWidth}"></div>
        //                 <div>Height: <input type="number" id="height" value="${defaultHeight}"></div>
        //                 <button onclick="
        //                     let name = document.getElementById('name').value;
        //                     let width = document.getElementById('width').value;
        //                     let height = document.getElementById('height').value;
        //                     callback(name, width, height);
        //                 ">Create</button>
        //             </body>
        //         </html>
        // `);

    });
}

function div() {
    return document.createElement("div");
}
function br() {
    return document.createElement("br");
}
function label(text: string) {
    let label = document.createElement("label");
    label.innerText = text;
    return label;
}

function getCreateDiv(finish: (name: string, width: number, height: number) => void){

    let createDiv = document.createElement("div");

    let title = document.createElement("div");
    title.innerText = "Create New Document";
    createDiv.appendChild(title);

    let templateDropdown = document.createElement("select");

    let templateOptions = [
        {
            name: "Blank",
            width: 100,
            height: 100
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
        }
        ];
    for (let option of templateOptions) {
        let optionElement = document.createElement("option");
        optionElement.innerText = option.name;
        optionElement.value = option.name;
        templateDropdown.appendChild(optionElement);
    }

    let templateLabel = document.createElement("label");
    templateLabel.innerText = "Template: ";
    templateLabel.appendChild(templateDropdown);
    createDiv.appendChild(templateLabel);
    createDiv.appendChild(templateDropdown);
    createDiv.appendChild(br());

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.value = "Untitled";
    let nameLabel = document.createElement("label");
    nameLabel.innerText = "Name: ";
    nameLabel.appendChild(nameInput);
    createDiv.appendChild(nameLabel);
    createDiv.appendChild(br());


    let widthInput = document.createElement("input");
    widthInput.type = "number";
    widthInput.value = "100";
    let widthLabel = document.createElement("label");
    widthLabel.innerText = "Width: ";
    widthLabel.appendChild(widthInput);
    createDiv.appendChild(widthLabel);
    createDiv.appendChild(br());


    let heightInput = document.createElement("input");
    heightInput.type = "number";
    heightInput.value = "100";
    let heightLabel = document.createElement("label");
    heightLabel.innerText = "Height: ";
    heightLabel.appendChild(heightInput);
    createDiv.appendChild(heightLabel);
    createDiv.appendChild(br());


    let createBtn = document.createElement("button");
    createBtn.innerText = "Create";
    createBtn.onclick = () => {
        let name = nameInput.value;
        let width = parseInt(widthInput.value);
        let height = parseInt(heightInput.value);
        finish(name, width, height);
    }
    createDiv.appendChild(createBtn);

    let templateDropdownChange = () => {
        let option = templateOptions.find((option) => option.name === templateDropdown.value);
        if (option) {
            widthInput.value = option.width.toString();
            heightInput.value = option.height.toString();
        }
    }
    templateDropdown.onchange = templateDropdownChange;

    templateDropdownChange();


    return createDiv;
}