import {BitmapPaintTool} from "./BitmapPaintTool";
import {BitmapLayerNode} from "../../Core/Documents/DocNodes/Layers/BitmapLayerNode";
import {PaintToolEvent} from "../../Core/PaintToolEvent";

/**
 * Paint tool that fills a region with a color
 *
 * Algorithm from http://www.williammalone.com/articles/html5-canvas-javascript-paint-bucket-tool/
 */
export class FillBucket extends BitmapPaintTool {
    async onDown(e: PaintToolEvent<BitmapLayerNode>): Promise<void> {
        await super.onDown(e);
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
        function colorPixel(pixelPos: number) {
            imgData.data[pixelPos] = 255;
            imgData.data[pixelPos + 1] = 0;
            imgData.data[pixelPos + 2] = 0;
            imgData.data[pixelPos + 3] = 255;
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

        // for (let i = 0; i < imgData.data.length; i += 4) {
        //     imgData.data[i] = 255;
        //     imgData.data[i + 1] = 0;
        //     imgData.data[i + 2] = 0;
        //     imgData.data[i + 3] = 255;
        // }
        ctx.putImageData(imgData, 0, 0);
    }
}