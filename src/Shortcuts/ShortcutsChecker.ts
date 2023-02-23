export interface IShortcut {
    key: string;
    ctrlKey: boolean;
    shiftKey: boolean;
    altKey: boolean;
}

type shortcutName = "resizePen" | "saveFile" | "redo" | "undo";


export function checkShortcut(key: shortcutName,
                              e: IShortcut): boolean {
    switch (key) {
        case "resizePen":
            return e.ctrlKey && e.altKey;
        case "saveFile":
            return e.ctrlKey && e.key === "s";
        case "redo":
            return e.ctrlKey && e.shiftKey && e.key === "z";
        case "undo":
            return e.ctrlKey && e.key === "z";
    }
    return false;
}