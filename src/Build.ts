import {build} from "esbuild";
import {glsl} from "esbuild-plugin-glsl";
console.log("Loading build script...");


async function buildProject(watch: boolean) {
    try {
        await build
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
        );
    }
    catch (e) {
        console.error(e);
    }
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

main().then(
    () => {
        console.log("Build script finished");
    }
)
