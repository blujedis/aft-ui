import { placeholder } from '$lib/constants';

import { common } from '../options';

const bordered = [common.bordered, common.divided].join(' ');

const baseVariant = {
	...placeholder,
	$base: 'divide-y border ' + bordered
};

export const accordion = {
	outlined: { ...baseVariant },
	flushed: {
		...baseVariant,
		$base: 'rounded-none'
	},
	filled: {
		...placeholder
	},
	glass: {
		...placeholder
	}
};
