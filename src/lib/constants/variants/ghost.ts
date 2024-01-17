import { mergeConfigs } from '$lib/theme';
import { bgGhost, bgGhostHover, textGhost, textGhostHover } from '../statez';

export const variantGhost = mergeConfigs(textGhost, bgGhost);

export const variantGhostHover = mergeConfigs(textGhost, textGhostHover, bgGhostHover);
