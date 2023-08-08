import { tile } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const baseVariant = mergeConfigs(tile, {
	$base: 'border-[3px] border-dashed relative'
});

export const empty = {
	outlined: {
		...baseVariant
	}
};
