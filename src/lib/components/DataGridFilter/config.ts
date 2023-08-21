import { placeholder, variantFilled, variantGhost } from '$lib/constants';

export const gridFilter = {
	filled: { ...variantFilled },
	outlined: { ...placeholder },
	ghost: { ...variantGhost }
};
