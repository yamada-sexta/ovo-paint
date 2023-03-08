export function base64ToImage(base64: string): HTMLImageElement {
    const img = new Image();
    img.src = base64;
    return img;
}