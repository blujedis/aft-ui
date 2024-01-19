import { textSolid, bgSolid, ringSolid, textStandard, textGhost, bgHoverGhost, outlineFocusVisibleGhost } from '$lib/constants/states';
import { mergeConfigs } from '$lib/theme/utils';

export const button = {
	text: mergeConfigs(textStandard, outlineFocusVisibleGhost),
	filled: mergeConfigs(bgSolid, textSolid, outlineFocusVisibleGhost),
	outlined: mergeConfigs(textSolid, textStandard, ringSolid, outlineFocusVisibleGhost, { $base: 'ring-1' }),
	ghost: mergeConfigs(textSolid, textGhost, bgHoverGhost, outlineFocusVisibleGhost),
};
