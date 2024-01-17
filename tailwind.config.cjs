import { plugin, generateTailwindVars, defaultColors } from '@aft/config';
import twcolors from 'tailwindcss/colors';

const themeColors = {
	...defaultColors,
	white: '#ffffff',
	black: '#000000',
	frame: {
		DEFAULT: twcolors.gray[500],
		...twcolors.gray
		//DEFAULT: '#64748B',
		// 50: '#F3F5F6',
		// 100: '#F0F2F4',
		// 200: '#E4E7EC',
		// 300: '#D5DAE1',
		// 400: '#B8C0CC',
		// 500: '#66778E',
		// 600: '#444F5F',
		// 700: '#2D343E',
		// 800: '#1C2027',
		// 900: '#0F1115',
		// 950: '#060709'
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
			},
			brightness: {
				115: '1.15'
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
