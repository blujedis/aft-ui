import { placeholder, solid, solidGhost, text, variantGlass } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const cardElement = {
	outlined: {
		...placeholder,
		$base: 'text-inherit',
		light: 'dark:text-[color:var(--text-dark)]'
	},
	filled: mergeConfigs(solid, {
		$base: 'text-white',
		light: 'text-inherit dark:text-[color:var(--text-dark)]'
	}),
	ghost: mergeConfigs(text, solidGhost, {
		$base: 'text-inherit',
		light: 'dark:text-[color:var(--text-dark)]'
	}),
	glass: mergeConfigs(variantGlass, {
	})
};
