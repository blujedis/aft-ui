import { textHover, bgAriaSelected, borderAriaSelected, textAriaSelected, solidGlassHover, bgAriaGlassSelected } from '../../constants';
import { mergeConfigs } from '../../theme';
const baseVariant = mergeConfigs(solidGlassHover, bgAriaSelected, {
    $base: 'text-frame-500 aria-selected:text-white',
    default: 'aria-selected:text-[color:var(--text-dark)]'
});
export const paginationPage = {
    filled: {
        ...baseVariant
    },
    flushed: mergeConfigs(textHover, textAriaSelected, borderAriaSelected, {
        $base: 'dark:border-black dark:border-opacity-40 aria-selected:border-opacity-100',
        dark: 'aria-selected:border-frame-600'
    }),
    glass: mergeConfigs(bgAriaGlassSelected, solidGlassHover, {
        $base: 'text-frame-500 aria-selected:text-white'
    })
};
