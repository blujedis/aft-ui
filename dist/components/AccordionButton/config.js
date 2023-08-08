import { mergeConfigs } from '../../theme';
import { bgAriaExpanded, bgAriaGlassExpanded, borderAriaExpanded, textAriaExpanded } from '../options';
import { common } from '../options';
const bordered = common.bordered;
// dark:border-black dark:border-opacity-40 border-b-frame-200
const baseVariant = mergeConfigs(textAriaExpanded, {
    $base: 'aria-expanded:border-b aria-expanded:text-white aria-expanded:font-medium ' + bordered,
    white: 'dark:aria-expanded:text-[color:var(--text-light)]',
    light: 'dark:aria-expanded:text-[color:var(--text-light)]',
    dark: 'dark:aria-expanded:text-[color:var(--text-light)]'
});
export const accordionButton = {
    outlined: { ...baseVariant },
    // dark:border-black dark:border-opacity-40 border-b-frame-200
    flushed: mergeConfigs(textAriaExpanded, borderAriaExpanded, {
        $base: 'border-0 border-b rounded-none aria-expanded:font-medium ' + bordered
    }),
    filled: mergeConfigs(textAriaExpanded, bgAriaExpanded, {
        $base: 'bg-frame-100 dark:bg-frame-500/30 aria-expanded:bg-frame-200 mb-1 aria-expanded:text-white dark:aria-expanded:text-white',
        dark: 'dark:aria-expanded:text-white dark:aria-expanded:bg-frame-900/80'
    }),
    glass: mergeConfigs(textAriaExpanded, bgAriaGlassExpanded, {
        $base: 'bg-frame-100 dark:bg-frame-500/10 mb-1 dark:aria-expanded:text-white',
        dark: 'dark:aria-expanded:text-white'
    })
};
