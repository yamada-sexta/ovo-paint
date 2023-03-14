export interface IShortcut {
    key: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
}

type shortcutName = "resizePen" | "saveFile" | "redo" | "undo" | "export";


export function checkShortcut(eventName: shortcutName,
                              e: IShortcut | KeyboardEvent): boolean {
    const key = e.key.toLowerCase();
    switch (eventName) {
        case "resizePen":
            return e.ctrlKey && e.altKey;
        case "saveFile":
            return e.ctrlKey && key === "s";
        case "redo":
            return e.ctrlKey && e.shiftKey && key === "z";
        case "undo":
            return e.ctrlKey && key === "z" && !e.shiftKey;
        case "export":
            console.log(e)
            return e.ctrlKey && key === "e";

    }
    return false;
}
