export function showTempMessage(message: string, root: HTMLElement = document.body) {
    let messageFrame = document.createElement("div");
    messageFrame.style.position = "absolute";
    let top = root.offsetTop;
    messageFrame.style.top = top + "px";
    messageFrame.style.left = root.offsetLeft + "px";

    let state: "in" | "out" | "none" = "in"

    messageFrame.style.width = "300px";
    messageFrame.style.height = "auto";
    messageFrame.style.backgroundColor = "rgba(255,255,255,0.5)";
    // messageFrame.style.zIndex = "2000";
    let messageText = document.createElement("div");
    messageText.style.padding = "10px";
    messageText.innerText = message;
    messageFrame.appendChild(messageText);
    root.appendChild(messageFrame);


    setTimeout(() => {
        animationFrame();
    }, 1000);


    function animationFrame() {
        if (state == "none") return;
        if (state == "in") {
            messageFrame.style.top = top + "px";
            messageFrame.style.left = root.offsetLeft + "px";
            top *= 1.1;
        }
        if (state == "out") {
            messageFrame.style.top = top + "px";
            messageFrame.style.left = root.offsetLeft + "px";
            top *= 0.9;
        }

        requestAnimationFrame(animationFrame);
    }

    setTimeout(() => {
        try {
            root.removeChild(messageFrame);
        } catch (e) {
            console.log(e);
        }
    }, 3000);
}
