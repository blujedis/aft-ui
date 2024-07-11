import { aft, defaultTheme } from '@aft/config';

const themes = {
	default: {
		...defaultTheme
	}
};

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class'
		}),
		aft(themes)
	]
};
