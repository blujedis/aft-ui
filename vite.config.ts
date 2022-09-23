import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import svg from 'vite-plugin-svelte-svgr';
// import { resolve } from 'path';

const config: UserConfig = {
	plugins: [sveltekit(), svg()],
	resolve: {
    alias: {
     // '$lib': resolve('./src/lib'),
    }
  }
};

export default config;
