import { filledBg, commonOutlineFocusVisible, filledText, outlinedRing, outlinedText, softBg, softText } from '$lib/constants/states';
import { mergeConfigs } from '$lib/theme/utils';

export const badge = {
	filled: mergeConfigs(filledBg, filledText, commonOutlineFocusVisible),
	outlined: mergeConfigs(outlinedText, outlinedRing, commonOutlineFocusVisible, {
		$base: 'ring-1 ring-inset'
	}),
	// ghost: mergeConfigs(ghostText, ghostBgHover, ghostTextHover, ghostOutlineFocusVisible),
	soft: mergeConfigs(softText, softBg, commonOutlineFocusVisible)
};