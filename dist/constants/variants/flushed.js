import { mergeConfigs } from '../../theme';
import { borderFlushed, borderflushedGroupHover } from '../statez';
export const variantFlushed = mergeConfigs(borderFlushed, {});
export const variantFlushedHover = mergeConfigs(variantFlushed, borderflushedGroupHover);
