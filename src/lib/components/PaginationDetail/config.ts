import { text, border, solid } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const paginationDetail = {
	filled: {
		...solid,
		$base: 'text-white'
	},
	outlined: mergeConfigs(border, text, {
		$base: 'text-inherit'
	})
};
