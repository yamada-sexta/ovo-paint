import {build} from "esbuild";
import {glsl} from "esbuild-plugin-glsl";
import * as path from "path";

console.log("Building...");

const workerEntryPoints = [
    'vs/language/json/json.worker.js',
    'vs/language/css/css.worker.js',
    'vs/language/html/html.worker.js',
    'vs/language/typescript/ts.worker.js',
    'vs/editor/editor.worker.js'
];



async function buildProject(watch: boolean) {
    await build({

        entryPoints: workerEntryPoints.map((entry) => `./node_modules/monaco-editor/esm/${entry}`),
        bundle: true,
        format: 'iife',
        outbase: '../node_modules/monaco-editor/esm/',
        outdir: path.join(__dirname, 'dist')
    });
    console.log("Done building workers.")



    build
    (
        {
            entryPoints: ["src/Main.ts"],
            bundle: true,
            sourcemap: true,
            outfile: "main.js",
            plugins: [glsl()],
            watch: watch,
            minify: false,
            minifySyntax: true,
            logLevel: "info",
            loader: {
                ".glsl": "text",
                ".ttf": "file"
            }
        }
    ).catch(
        (e) => {
            console.log(e);

            process.exit(1);
        }
    );
}

async function main() {
    let watch = false;
    for (let i = 0; i < process.argv.length; i++) {
        if (process.argv[i] == "--watch") {
            watch = true;
        }
    }
    await buildProject(watch);
}

(
    async () => {
        await main();
    }
)();


console.log("Done.");
