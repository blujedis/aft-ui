import { text, solid, border, solidGlass } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const kbd = {
	filled: mergeConfigs(solid, {
		$base: 'text-white',
		white: 'text-[color:var(--text-dark)]',
		light: 'text-[color:var(--text-dark)]'
	}),
	outline: mergeConfigs(border, text, {
		$base: ''
	}),
	glass: mergeConfigs(solidGlass, text, {
		white: 'text-[color:var(--text-dark)]',
		light: 'text-[color:var(--text-dark)]'
	})
};
