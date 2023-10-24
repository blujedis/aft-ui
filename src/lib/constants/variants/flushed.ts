import { mergeConfigs } from '$lib/theme';
import { borderFlushed, borderflushedGroupHover } from '../states';

export const variantFlushed = mergeConfigs(borderFlushed, {});

export const variantFlushedHover = mergeConfigs(variantFlushed, borderflushedGroupHover);
