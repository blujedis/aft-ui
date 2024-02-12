import { mergeConfigs } from '$lib/theme';
import { placeholder } from '../options';
import { common } from '../states';

export const variantPanel = mergeConfigs(placeholder, {
	$base: ['bg-white dark:bg-frame-700', common.ringed].join(' ')
});
