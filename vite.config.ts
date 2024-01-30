import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';
import { buildTokens } from './generate';

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: 'prebuild-commands',
			handleHotUpdate: () => buildTokens(),
			buildStart: () => buildTokens()
		}
	],
	server: {
		port: 5174
	},
	clearScreen: false,
	build: {
		rollupOptions: {}
	},
	resolve: {
		alias: {
			'@root': resolve(process.cwd()),
			'@rootpkg': resolve(__dirname)
			// $lib: resolve('./src/lib'),
			// '@app': resolve('./src/app'),
		}
	},
	test: {
		// https://vitest.dev/guide/coverage
		include: ['src/**/*.{test,spec}.{js,ts}'],
		coverage: {
			provider: 'istanbul', // or 'v8'
			reporter: ['text', 'json', 'html'],
		},
	}
});
