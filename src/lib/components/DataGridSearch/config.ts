import { placeholder, variantFilled, variantGhost, variantGlass } from '$lib/constants';

export const gridSearch = {
	filled: { ...variantFilled },
	outlined: { ...placeholder },
	glass: { ...variantGlass },
	ghost: { ...variantGhost }
};
