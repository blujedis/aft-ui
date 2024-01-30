import { mergeConfigs } from '../../theme';
import { placeholder } from '../statez';
import { common } from '../options';
export const variantPanel = mergeConfigs(placeholder, {
    $base: ['bg-white dark:bg-frame-700', common.ringed].join(' ')
});
