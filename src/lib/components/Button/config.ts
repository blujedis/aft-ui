import {
	filledBg,
	filledText,
	outlinedText,
	outlinedRing,
	ghostBgHover,
	ghostText,
	ghostTextHover,
	softBg,
	softText,
	commonOutlineFocusVisible
} from '$lib/constants/states';
import { mergeConfigs } from '$lib/theme/utils';

export const button = {
	text: mergeConfigs(outlinedText, commonOutlineFocusVisible),
	filled: mergeConfigs(filledBg, filledText, commonOutlineFocusVisible),
	outlined: mergeConfigs(outlinedText, outlinedRing, commonOutlineFocusVisible, {
		$base: 'ring-1 ring-inset'
	}),
	ghost: mergeConfigs(ghostText, ghostBgHover, ghostTextHover, commonOutlineFocusVisible),
	soft: mergeConfigs(softText, softBg, commonOutlineFocusVisible)
};
