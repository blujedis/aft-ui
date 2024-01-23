import { mergeConfigs } from '$lib/theme/utils';
import { filledBg, filledBgAriaExpanded, filledText, filledTextAriaExpanded } from '$lib/constants/states';
import { variantTextExpanded, variantItemExpanded } from '$lib/constants/variants';

// export const accordionButton = {
// 	flushed: { ...variantTextExpanded },
// 	filled: { ...variantItemExpanded },
// 	outlined: { ...variantTextExpanded }
// };

export const accordionButton = {
	flushed: mergeConfigs(filledTextAriaExpanded, {}),
	filled: mergeConfigs({ $base: 'aria-expanded:text-white' }, filledBg),
	outlined: mergeConfigs({}, {}),
}