// @ts-check
import fs from "node:fs";
import { build } from "esbuild";

async function make() {
  const pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
  const [, , ...args] = process.argv;

  const watch = args.includes("--watch");

  build({
    outfile: "dist/server.mjs",
    entryPoints: ["./src/server.ts"],
    format: "esm",
    bundle: true,
    platform: "node",
    target: "node16",
    external: Object.keys(pkg.dependencies),
    watch,
    logLevel: "info",
    minify: !watch,
  });
}

make();
