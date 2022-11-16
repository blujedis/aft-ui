const { plugin: forewind, defaultPalette, genPalette } = require('@forewind/util/plugin');

/** @type {import('@forewind/util/plugin').PluginOptions} */
const config = {
	output: false,
	outdir: './src/lib/components',
	dynamic: true,
	outtype: 'esm',
	outext: 'ts'
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
		forewind(config)
	]
};
