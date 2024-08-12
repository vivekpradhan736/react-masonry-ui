import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    name: "react-masonry-gallery",
  },
  external: ["react", "react-dom", "clsx"],
  plugins: [
    resolve(),
    typescript({ tsconfig: "tsconfig.json" }),
    postcss({
      extract: true, // Extract CSS into a separate file
      minimize: true, // Minify the CSS
    }),
  ],
});
