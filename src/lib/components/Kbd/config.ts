import { text, solid, border, solidGlass } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const kbd = {
	filled: mergeConfigs(solid, {
		$base: 'text-white',
		light: 'text-[color:var(--text-dark)]'
	}),
	outline: mergeConfigs(border, text, {
		$base: ''
	}),
	glass: mergeConfigs(solidGlass, text, {
		light: 'text-[color:var(--text-dark)]'
	})
};
