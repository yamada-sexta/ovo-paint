interface IShortcut {
    key: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
}

type shortcutKey = "resizePen" | "saveFile" | "redo" | "undo";



export function checkShortcut(key: shortcutKey,
                              e: { key: string, ctrlKey: boolean, shiftKey: boolean, altKey: boolean }): boolean {
    switch (key){
        case "resizePen":
            return  e.ctrlKey && e.altKey;
        case "saveFile":
            return e.ctrlKey && e.key === "s";
        case "redo":
            return e.ctrlKey && e.shiftKey && e.key === "z";
        case "undo":
            return e.ctrlKey && e.key === "z";
    }
    return false;
}