import { resolve } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		port: 5174
	},
	clearScreen: false,
	build: {
		rollupOptions: {
			// external: []
		}
	},
	resolve: {
		alias: {
			'@app': resolve('./src/app'),
			$lib: resolve('./src/lib')
		}
	}
};

export default config;
