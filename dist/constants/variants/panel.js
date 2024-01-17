import { mergeConfigs } from '../../theme';
import { placeholder, common } from '../states';
export const variantPanel = mergeConfigs(placeholder, {
    $base: ['bg-white dark:bg-frame-700', common.ringed].join(' ')
});
