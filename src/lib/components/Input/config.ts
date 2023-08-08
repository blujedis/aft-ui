import {
	variantFilledHover,
	variantOutlinedHover,
	variantFlushed,
	variantGlassHover
} from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const input = {
	outlined: {
		...variantOutlinedHover
	},
	filled: {
		...variantFilledHover
	},
	flushed: mergeConfigs(variantFlushed, {
		$base: 'px-1 peer focus:ring-0 focus:outline-none border-0'
	}),
	glass: {
		...variantGlassHover
	}
};
