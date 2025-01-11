import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  esbuild: {
    jsxFactory: "React.createElement",
  },
});
