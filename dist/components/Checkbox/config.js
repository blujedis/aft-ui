import { variantBorderHover } from '../../constants/variants';
import { mergeConfigs } from '../../theme';
export const checkbox = {
    outlined: mergeConfigs(variantBorderHover, {
        $base: 'dark:focus:bg-transparent',
        default: '',
        dark: ''
    })
};
