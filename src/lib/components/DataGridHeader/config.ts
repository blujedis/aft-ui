import { placeholder, variantFilled, variantGhost, variantGlass } from '$lib/constants';

export const gridHeader = {
	filled: { ...variantFilled },
	outlined: { ...placeholder },
	glass: { ...variantGlass },
	ghost: { ...variantGhost }
};
