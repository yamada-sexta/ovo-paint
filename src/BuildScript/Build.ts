import * as esbuild from 'esbuild'
import {LogLevel} from 'esbuild'
import {glsl} from "esbuild-plugin-glsl";
import {assetsHelper} from "./AssetsHelper";

async function buildProject(watch: boolean, logLevel: LogLevel) {
    let esbuildCtx = await esbuild.context({
        entryPoints: ["src/Main.ts"],
        plugins: [
            glsl(),
            assetsHelper(),
        ],
        bundle: true,
        sourcemap: true,
        outfile: "main.js",
        logLevel: "info",
    })
    if (!watch) {
        await esbuildCtx.rebuild();
        return;
    }
    await esbuildCtx.watch()
}


async function main() {
    let watch = false;
    let logLevel: LogLevel = "info";
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == "--watch" || process.argv[i] == "-w") {
            watch = true;
        }
        if (process.argv[i] == "log-level" || process.argv[i] == "-l") {
            if (i + 1 >= process.argv.length) {
                console.error("Log level not specified");
                return;
            }
            logLevel = process.argv[i + 1] as LogLevel;
        }
    }
    await buildProject(watch, logLevel);
}

main().then(
    () => {
        console.log("Build script loaded.");
    }
).catch(
    (err) => {
        console.error("Build script failed to load.");
        console.error(err);
    }
)
