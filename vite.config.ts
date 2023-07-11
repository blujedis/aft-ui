import { resolve } from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
// import watchAndRun from 'vite-plugin-watch-and-run';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [
		sveltekit()
		// watchAndRun([
		// 	{
		// 		name: 'rebuild',
		// 		watchKind: ['add', 'change', 'unlink'],
		// 		watch: resolve('src/**/*.(ts|svelte)'),
		// 		run: 'npm run package',
		// 		delay: 500
		// 	}
		// ])
	],
	server: {
		port: 5174
	},
	clearScreen: false,
	build: {
		rollupOptions: {
			// external: [new RegExp('/components/_Example/.*')]
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
