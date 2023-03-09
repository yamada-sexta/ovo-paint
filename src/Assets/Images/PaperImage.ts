export async function paperImage() {
    let paperImage = document.createElement("img");
    paperImage.src = "src/Assets/Images/paper.png";
    return new Promise<HTMLImageElement>((
        resolve: (value: HTMLImageElement) => void,
        reject: (reason: any) => void
    ) => {
        paperImage.onload = () => {
            resolve(paperImage);
        }
        paperImage.onerror = () => {
            reject("Failed to load paper image");
        }
    })
}