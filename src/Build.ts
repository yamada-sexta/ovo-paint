import {build} from "esbuild";
import {glsl} from "esbuild-plugin-glsl";

console.log("Building...");

async function buildProject(watch: boolean) {
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
