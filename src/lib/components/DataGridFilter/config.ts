import { placeholder, variantFilled, variantGhost, variantGlass } from '$lib/constants';

export const gridFilter = {
	filled: { ...variantFilled },
	outlined: { ...placeholder },
	glass: { ...variantGlass },
	ghost: { ...variantGhost }
};
