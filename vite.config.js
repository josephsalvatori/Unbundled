import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

const wasmContentTypePlugin = {
	name: "wasm-content-type-plugin",
	configureServer(server) {
		server.middlewares.use((req, res, next) => {
			if(req.url.endsWith(".wasm")) {
				res.setHeader("Content-Type", "application/wasm");
			}
			next();
		});
	}
};

export default defineConfig({
    plugins: [
		wasmContentTypePlugin,
		tailwindcss(),
		sveltekit(),
	],
	server: {
		fs: {
			allow: [".."]
		},
	},
	define: {
		global: {}
	},
    test: {
        include: ["src/**/*.{test,spec}.{js,ts}"]
    }
});
