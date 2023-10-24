import { mergeConfigs } from '$lib/theme';
import { textHover, textExpanded, textBase } from '../states';

export const variantText = { ...textBase };

export const variantTextHover = mergeConfigs(variantText, textHover);

export const variantTextExpanded = { ...textExpanded };
