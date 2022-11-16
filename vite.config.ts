import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import svg from 'vite-plugin-svelte-svgr';
import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit(), svg()],
	clearScreen: false,
	build: {
		// commonjsOptions: {
		// 	transformMixedEsModules: true
		// }
	},
	resolve: {
		alias: {
			$docs: resolve('./src/docs')
		}
	}
};

export default config;
