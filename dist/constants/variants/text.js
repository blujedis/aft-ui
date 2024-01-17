import { mergeConfigs } from '../../theme';
import { textHover, textExpanded, textBase, textGhost, textGhostHover } from '../states';
export const variantText = { ...textBase };
export const variantTextHover = mergeConfigs(variantText, textHover);
export const variantTextGhost = { ...textGhost };
export const variantTextGhostHover = mergeConfigs(textHover, textGhostHover);
export const variantTextExpanded = { ...textExpanded };
