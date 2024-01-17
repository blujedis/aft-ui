import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
	plugins: [sveltekit()],
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
			'@rootpkg': resolve(__dirname),
			// $lib: resolve('./src/lib'),
			// '@app': resolve('./src/app'),
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});

