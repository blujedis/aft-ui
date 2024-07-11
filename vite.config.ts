import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { watchTokens } from './watchTokens';

export default defineConfig(({ command }) => {
	return {
		plugins: [
			sveltekit(),
			{
				name: 'prebuild-commands',
				enforce: 'pre',
				apply: 'serve',
				// handleHotUpdate: async () => watchTokens(),
				buildStart: () => watchTokens()
			}
		],
		server: {
			port: 5174,
			watch: {
				ignored: [
					'./watchTokens.ts',
					'./static/**',
					'./node_modules/**',
					'./dist/**',
					'./coverage/**',
					'./test/**',
					'./.tmp/**',
					'./src/lib/constants/states.ts'
				]
			}
		},
		clearScreen: false,
		test: {
			// https://vitest.dev/guide/coverage
			include: ['src/**/*.{test,spec}.{js,ts}'],
			coverage: {
				provider: 'istanbul', // or 'v8'
				reporter: ['text', 'json', 'html']
			}
		}
	};
});
