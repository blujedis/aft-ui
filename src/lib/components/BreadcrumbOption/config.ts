import { mergeConfigs } from '$lib/theme';
import { variantTextHover, variantTextGhostHover, placeholder } from '$lib/constants';

export const breadcrumbOption = {
	text: {
		...variantTextHover
	},
	filled: mergeConfigs(variantTextHover, {
		// $base: 'text-white hover:text-[color:var(--text-light)]',
		// light: 'text-[color:var(--text-dark)]'
	}),
	ghost: { ...placeholder }
};
