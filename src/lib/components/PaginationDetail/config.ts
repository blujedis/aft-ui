import { placeholder, text } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const border = { ...placeholder }

export const paginationDetail = {
	// solid
	filled: {

		$base: 'text-inherit'
	},
	outlined: mergeConfigs(border, text, {
		$base: 'text-inherit'
	})
};
