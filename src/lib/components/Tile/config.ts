import { mergeConfigs } from '$lib/theme';
import { variantFilledHover, variantGlass, variantOutlinedHover } from '$lib/constants';

const baseVariant = mergeConfigs(variantFilledHover, {
	$base: 'border border-transparent font-medium'
});

export const tile = {
	filled: { ...baseVariant },
	outline: mergeConfigs(variantOutlinedHover, {
		$base: 'ring-1 font-medium'
	}),
	glass: {
		...variantGlass
	}
};
