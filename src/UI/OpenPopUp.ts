export function openPopUp(title: string, width: number, height: number, content: HTMLElement): Window | null {
    let newWindow = window.open("", "", `width=${width},height=${height}`);
    if (!newWindow) {
        return null;
    }

    newWindow.document.title = title;
    newWindow.document.body.append(content);
    return newWindow;
}