import { placeholder } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const border = { ...placeholder };

export const paginationDetail = {
	// solid
	filled: {
		$base: 'text-inherit'
	},
	// text
	outlined: mergeConfigs(border, {
		$base: 'text-inherit'
	})
};
