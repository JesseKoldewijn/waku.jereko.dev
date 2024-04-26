import { defineConfig, type UserConfig } from "vite";

const config: UserConfig = {
	resolve: {
		alias: {
			"@": "/src",
		},
	},
};

export default defineConfig(config);
