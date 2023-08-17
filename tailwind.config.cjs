import { plugin, generateTailwindVars, defaultColors } from '@aft/config';

const themeColors = {
	...defaultColors,
	white: '#ffffff',
	black: '#000000',
	frame: {
		DEFAULT: '#6b7280',
		'50': '#f9fafb',
		'100': '#f3f4f6',
		'200': '#e5e7eb',
		'300': '#d1d5db',
		'400': '#9ca3af',
		'500': '#6b7280',
		'600': '#4b5563',
		'700': '#374151',
		'800': '#1f2937',
		'900': '#111827',
		'950': '#030712'
	}
};

const colors = generateTailwindVars(themeColors);

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors,
			keyframes: {
				'fade-in-down': {
					'0%': {
						opacity: '0',
						transform: 'translateY(-10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				}
			},
			animation: {
				'fade-in-down': 'fade-in-down 0.3s ease-out'
			}
		}
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class'
		}),
		plugin(themeColors)
	]
};
