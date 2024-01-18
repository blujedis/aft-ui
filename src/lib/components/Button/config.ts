import { textSolid, bgSolid, ringSolid, textSoft, textGhost, bgHoverGhost, outlineFocusVisibleGhost } from '$lib/constants/states';
import { mergeConfigs } from '$lib/theme/utils';

export const button = {
	text: mergeConfigs(textSoft, outlineFocusVisibleGhost),
	filled: mergeConfigs(bgSolid, textSolid, outlineFocusVisibleGhost),
	outlined: mergeConfigs(textSolid, textSoft, ringSolid, outlineFocusVisibleGhost, { $base: 'ring-1' }),
	ghost: mergeConfigs(textSolid, textGhost, bgHoverGhost, outlineFocusVisibleGhost),
};
