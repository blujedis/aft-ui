import { variantBorderHover } from '$lib/constants/variants';
import { mergeConfigs } from '$lib/theme';

export const checkbox = {
  outlined: mergeConfigs(variantBorderHover, {
    $base: 'dark:focus:bg-transparent',
    default: '',
    dark: ''
  })
};