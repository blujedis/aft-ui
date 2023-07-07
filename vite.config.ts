import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import svg from 'vite-plugin-svelte-svgr';
import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit(), svg()],
	clearScreen: false,
	build: {},
	resolve: {
		alias: {
			'@app': resolve('./src/app'),
			$lib: resolve('./src/lib')
		}
	}
};

export default config;
