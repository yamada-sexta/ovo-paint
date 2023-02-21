interface CreateCallback {
    name: string;
    width: number;
    height: number;

}

export function openCreateWindow(
    callback: (arg: CreateCallback) => void,
    windowWidth: number = 300,
    windowHeight: number = 300,
    defaultWidth: number = 100,
    defaultHeight: number = 100
): void {
    (window as any).CreateUICallback = (
        name: string,
        width: number,
        height: number
    ) => {
        console.log("Callback called");
        console.log(name, width, height)
        callback({name, width, height});
    };
    let createWindow = window.open("", "", "width=300,height=300")
    if (createWindow) {
        createWindow.document.write(`
                <html>
                    <head>
                        <title>Create</title>
                    </head>
                    <body>
                        <div>Create New Document</div>
                        <div>Name: <input type="text" id="name" value="Untitled"></div>
                        <div>Width: <input type="number" id="width" value="${defaultWidth}"></div>
                        <div>Height: <input type="number" id="height" value="${defaultHeight}"></div>
                        <button onclick="window.opener.CreateUICallback(
                            document.getElementById('name').value,
                            document.getElementById('width').value,
                            document.getElementById('height').value
                        )
                        window.close();
                        ">Create</button>
                    </body>
                </html>
        `);
    }

}
