import {
	variantText,
	variantFilledHover,
	variantOutlinedHover,
	variantGhostHover,
	variantGlassHover
} from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const button = {
	filled: {
		...variantFilledHover
	},
	outlined: {
		...variantOutlinedHover
	},
	text: {
		...variantText
	},
	ghost: {
		...variantGhostHover
	},
	glass: mergeConfigs(variantGlassHover, {})
};
