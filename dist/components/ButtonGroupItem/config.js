import { bgAriaChecked, filledText, placeholder } from '../../constants';
import { mergeConfigs } from '../../theme';
const baseVariant = mergeConfigs(filledText, bgAriaChecked, {
    $base: 'border border-transparent'
});
export const buttonGroupItem = {
    filled: {
        ...baseVariant
    },
    outlined: mergeConfigs(bgAriaChecked, {
        $base: 'bg-transparent aria-checked:text-white hover:z-10'
    }),
    text: {
        ...placeholder,
        $base: 'no-underline aria-checked:underline',
        white: 'text-inherit',
        light: 'text-inherit',
        dark: 'text-inherit'
    },
    ghost: mergeConfigs(bgAriaChecked, {
        $base: 'aria-checked:text-white',
        white: 'aria-checked:text-[color:var(--text-dark)]',
        light: 'aria-checked:text-[color:var(--text-dark)]'
    }),
    glass: {
        ...placeholder // TODO: add glass styles.
    }
};
