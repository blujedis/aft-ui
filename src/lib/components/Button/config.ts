import { textSolid, bgSolid, ringSolid, textSoft, textGhost, bgHoverGhost, outlineFocusVisibleGhost } from '$lib/constants/states';
import { mergeConfigs } from '$lib/theme/utils';

// .append('focus:outline-offset-0 focus:outline-1', variant === 'outlined')
// .append('focus:outline-offset-0', variant === 'text')


export const button = {
	text: mergeConfigs(textSolid, textSoft, outlineFocusVisibleGhost),
	filled: mergeConfigs(bgSolid, textSolid, outlineFocusVisibleGhost),
	outlined: mergeConfigs(textSolid, textSoft, ringSolid, outlineFocusVisibleGhost, { $base: 'ring-1'}),
	ghost: mergeConfigs(textSolid, textGhost, bgHoverGhost, outlineFocusVisibleGhost),
};
