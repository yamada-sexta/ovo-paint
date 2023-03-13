import {baseClass} from "./DOM/DOMFunctions";

export function initializeUIDependencyOn(win: Window = window) {
    initializeGoogleFonts(win)
    initializeCSS(win)
    initializeMaterialIcons(win)
}

function initializeGoogleFonts(win: Window) {
    let document = win.document;
    let link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.googleapis.com";
    document.head.appendChild(link);
    link = document.createElement("link");
    link.rel = "preconnect";
    link.href = "https://fonts.gstatic.com";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
    link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    // This is the same as:
    // <link rel="preconnect" href="https://fonts.googleapis.com">
    // <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    // <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap" rel="stylesheet">
}

function initializeMaterialIcons(win: Window) {
    let document = win.document;
    let link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0";
    document.head.appendChild(link);
}

function initializeCSS(win: Window) {
    let document = win.document;
    let style = document.createElement("style");
    style.innerHTML = `
    .${baseClass} {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
       }
    `;
    document.head.appendChild(style);
}
