import { mergeConfigs } from '../../theme';
import { bgGhost, bgGhostHover, textGhost, textGhostHover } from '../states';
export const variantGhost = mergeConfigs(textGhost, bgGhost);
export const variantGhostHover = mergeConfigs(textGhost, textGhostHover, bgGhostHover);
