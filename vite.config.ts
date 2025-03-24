import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{
				find: "@",
				replacement: path.resolve(__dirname, "src"),
			},
			{
				find: "use-sync-external-store/shim",
				replacement: path.resolve(
					__dirname,
					"node_modules/use-sync-external-store/shim/index.js",
				),
			},
		],
		extensions: [".tsx", ".ts", ".scss"],
	},
	base: "./",
});
