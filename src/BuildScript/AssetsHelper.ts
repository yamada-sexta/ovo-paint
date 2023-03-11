// import plugin type from esbuild
import type {Plugin} from "esbuild";
import * as fs from "fs/promises";
import {buildSettings} from "./BuildSettings";

async function findAllAssets(rootDir: string): Promise<string[]> {
    const out: string[] = [];
    const files = await fs.readdir(rootDir);
    for (let i = 0; i < files.length; i++) {
        if (files[i].startsWith(".")) {
            continue;
        }
        if (files[i].endsWith(".ts")) {
            continue;
        }
        const path = rootDir + "/" + files[i];
        // if the file is a directory, recursively search it
        const stat = await fs.lstat(path);
        if (stat.isDirectory()) {
            out.push(...await findAllAssets(path));
        } else {
            out.push(path);
        }
    }
    return out;
}


async function processImage(assetPath: string): Promise<string> {
    return `
        ((() => {
            const image = new Image();
            image.src = "${assetPath}";
            return image;
        })())
    `
}

async function processText(assetPath: string): Promise<string> {
    let content = await fs.readFile(assetPath, "utf-8");
    content = content.replace(/`/g, "\\`");
    return "`" + content + "`";
}

async function processAllAssets(assets: string[]): Promise<{
    [key: string]: string
}> {
    const out: { [key: string]: string } = {};

    for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        const assetName = asset.replace(/\//g, "_").replace(/\./g, "_");
        const fileParts = asset.split(".");
        const fileExtensions = fileParts[fileParts.length - 1].toLowerCase();
        if (fileExtensions == "png" || fileExtensions == "jpg") {
            out[assetName] = await processImage(asset);
        }
        if (fileExtensions == "txt" || fileExtensions == "md") {
            out[assetName] = await processText(asset);
        }
    }


    return out;
}

async function generateAssetsFile(assets: {
    [key: string]: string
}): Promise<string> {
    let out = "export const assets = {\n";
    for (const key in assets) {
        out += `${key}: ${assets[key]},\n`;
    }
    out += "};\n";
    return out;
}

async function onBuildStart(debug: boolean) {
    if (debug) {
        console.log("assets-helper plugin loaded");
    }
    const assetPaths = buildSettings.assetPaths;
    const assets: string[] = [];
    for (let i = 0; i < assetPaths.length; i++) {
        assets.push(...await findAllAssets(assetPaths[i]));
    }
    if (debug) {
        console.log("Found assets:");
        console.log(assets);
    }
    const processedAssets = await processAllAssets(assets);
    const assetsFile = await generateAssetsFile(processedAssets);
    if (debug) {
        console.log("Assets file:");
        console.log(assetsFile);
    }
    await fs.writeFile(buildSettings.assetsOut, assetsFile);
}

export function assetsHelper(debug: boolean = false) {
    if (debug) {
        console.log("assets-helper plugin loaded");
    }
    const plugin: Plugin = {
        name: "assets-helper",



        async setup(build) {

            build.onStart(async () => {
                await onBuildStart(debug);
            });
        }
    }
    return plugin;
}
