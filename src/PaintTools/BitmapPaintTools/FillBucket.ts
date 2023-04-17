import {BitmapPaintTool} from "./BitmapPaintTool";
import {BitmapLayerNode} from "../../Core/Documents/DocNodes/Layers/BitmapLayerNode";
import {PaintToolEvent} from "../../Core/PaintToolEvent";
import {br, div, input, text} from "../../UI/DOM/DOMFunctions";

/**
 * Paint tool that fills a region with a color
 *
 * Algorithm from http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
 */
export class FillBucket extends BitmapPaintTool {
    color = "#000000";
    getMenu(): HTMLElement {
        const menu = div();
        menu.appendChild(text("Fill Bucket"));
        menu.appendChild(br())
        menu.appendChild(input({
            type: "color",
            value: this.color,
            onchange: (e) => {
                this.color = (e.target as HTMLInputElement).value;
            }
        }))
        return menu;
    }

    async onDown(e: PaintToolEvent<BitmapLayerNode>): Promise<void> {
        await super.onDown(e);
        e.node.createSnapshot();
        const ctx = e.node.ctx;
        const canvas = ctx.canvas;
        const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        const width = canvas.width;
        const height = canvas.height;

        const pos = [~~e.pos[0], ~~e.pos[1]];

        console.log(pos)

        function getPixel(x: number, y: number) {
            let i = (y * width + x) * 4;
            // convert i to int
            i = ~~i;
            console.log(i)
            console.log(imgData.data[i])
            return {
                r: imgData.data[i],
                g: imgData.data[i + 1],
                b: imgData.data[i + 2],
                a: imgData.data[i + 3]
            }
        }


        const startPixel = getPixel(pos[0], pos[1]);

        function matchStartColor(pixelPos: number) {
            const r = imgData.data[pixelPos];
            const g = imgData.data[pixelPos + 1];
            const b = imgData.data[pixelPos + 2];
            const a = imgData.data[pixelPos + 3];
            return (r === startPixel.r && g === startPixel.g && b === startPixel.b && a === startPixel.a);
        }
        // console.log(imgData)
        // console.log(startPixel);
        const targetColor = {
            r: parseInt(this.color.slice(1, 3), 16),
            g: parseInt(this.color.slice(3, 5), 16),
            b: parseInt(this.color.slice(5, 7), 16),
            a: 255
        }
        function colorPixel(pixelPos: number) {
            imgData.data[pixelPos] = targetColor.r;
            imgData.data[pixelPos + 1] = targetColor.g;
            imgData.data[pixelPos + 2] = targetColor.b;
            imgData.data[pixelPos + 3] = targetColor.a;
        }

        const pixelStack = [pos];

        let x = pos[0];
        let y = pos[1];
        while (pixelStack.length) {
            const newPos = pixelStack.pop() as [number, number];
            x = newPos[0];
            y = newPos[1];

            let pixelPos = (y * width + x) * 4;
            pixelPos = ~~pixelPos;
            while (y-- >= 0 && matchStartColor(pixelPos)) {
                pixelPos -= width * 4;
            }
            pixelPos += width * 4;
            ++y;
            let reachLeft = false;
            let reachRight = false;
            while (y++ < height - 1 && matchStartColor(pixelPos)) {
                colorPixel(pixelPos);

                if (x > 0) {
                    if (matchStartColor(pixelPos - 4)) {
                        if (!reachLeft) {
                            pixelStack.push([x - 1, y]);
                            reachLeft = true;
                        }
                    } else if (reachLeft) {
                        reachLeft = false;
                    }
                }

                if (x < width - 1) {
                    if (matchStartColor(pixelPos + 4)) {
                        if (!reachRight) {
                            pixelStack.push([x + 1, y]);
                            reachRight = true;
                        }
                    } else if (reachRight) {
                        reachRight = false;
                    }
                }

                pixelPos += width * 4;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }
}