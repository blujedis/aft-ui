import { mergeConfigs } from '../../theme';
import { variantTextHover, variantTextGhostHover, placeholder } from '../../constants';
export const breadcrumbOption = {
    text: {
        ...variantTextHover
    },
    filled: mergeConfigs(variantTextHover, {
    // $base: 'text-white hover:text-[color:var(--text-light)]',
    // light: 'text-[color:var(--text-dark)]'
    }),
    ghost: { ...placeholder }
};
