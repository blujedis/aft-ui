import { mergeConfigs } from '$lib/theme';
import { common } from '../options';
import { placeholder } from '../placeholder';

export const variantPanel = mergeConfigs(placeholder, {
	$base: ['bg-white dark:bg-frame-700', common.ringed].join(' ')
});
