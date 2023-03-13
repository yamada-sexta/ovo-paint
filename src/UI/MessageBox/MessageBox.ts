export function showMessageBox(message: string, root: HTMLElement = document.body) {
    let messageBox = document.createElement("div");
    messageBox.style.position = "absolute";
    messageBox.style.top = "0";
    messageBox.style.left = "0";
    messageBox.style.width = "100%";
    messageBox.style.height = "100%";
    messageBox.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    messageBox.style.zIndex = "1000";
    messageBox.style.display = "flex";
    messageBox.style.alignItems = "center";
    messageBox.style.justifyContent = "center";
    let messageBoxContent = document.createElement("div");
    messageBoxContent.style.backgroundColor = "white";
    messageBoxContent.style.padding = "10px";
    messageBoxContent.style.borderRadius = "10px";
    messageBoxContent.style.boxShadow = "0 0 10px black";
    messageBoxContent.style.maxWidth = "500px";
    messageBoxContent.style.maxHeight = "500px";
    messageBoxContent.style.overflow = "auto";
    messageBoxContent.innerText = message;
    messageBox.appendChild(messageBoxContent);
    root.appendChild(messageBox);
    let close = document.createElement("button");
    close.innerText = "Close";
    close.onclick = () => {
        root.removeChild(messageBox);
    }
    messageBoxContent.appendChild(close);
}

