import { placeholder, solid, solidGhost, text, variantGlass } from '../../constants';
import { mergeConfigs } from '../../theme';
export const cardElement = {
    outlined: {
        ...placeholder,
        $base: 'text-inherit',
        white: 'dark:text-[color:var(--text-dark)]',
        light: 'dark:text-[color:var(--text-dark)]'
    },
    filled: mergeConfigs(solid, {
        $base: 'text-white',
        white: 'text-inherit dark:text-[color:var(--text-dark)]',
        light: 'text-inherit dark:text-[color:var(--text-dark)]'
    }),
    ghost: mergeConfigs(text, solidGhost, {
        $base: 'text-inherit',
        white: 'dark:text-[color:var(--text-dark)]',
        light: 'dark:text-[color:var(--text-dark)]'
    }),
    glass: mergeConfigs(variantGlass, {
        white: 'dark:text-[color:var(--text-dark)]'
    })
};
