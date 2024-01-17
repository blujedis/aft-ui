import { mergeConfigs } from '$lib/theme';
import { placeholder } from '../statez/placeholders';
import { bgFilled, bgFilledHover, textFilled } from '../statez';

export const variantActive = {
	...placeholder,
	$base: 'bg-frame-50 dark:bg-frame-700/50'
};

export const variantFilled = mergeConfigs(textFilled, bgFilled);

export const variantFilledHover = mergeConfigs(variantFilled, bgFilledHover);
