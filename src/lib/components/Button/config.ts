import {
	variantFilledHover,
	variantTextHover,
	variantGhostHover,
	variantOutlinedHover
} from '$lib/constants/variants';

export const button = {
	text: { ...variantTextHover },
	filled: { ...variantFilledHover },
	outlined: { ...variantOutlinedHover },
	ghost: { ...variantGhostHover }
};
