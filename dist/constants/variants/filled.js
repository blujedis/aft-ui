import { mergeConfigs } from '../../theme';
import { placeholder } from '../states/placeholders';
import { bgFilled, bgFilledHover, textFilled } from '../states';
export const variantActive = {
    ...placeholder,
    $base: 'bg-frame-50 dark: dark:bg-frame-700/50'
};
export const variantFilled = mergeConfigs(textFilled, bgFilled);
export const variantFilledHover = mergeConfigs(variantFilled, bgFilledHover);
