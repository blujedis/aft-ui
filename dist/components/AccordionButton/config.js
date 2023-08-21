import { mergeConfigs } from '../../theme';
import { bgAriaExpanded, bgAriaGlassExpanded, borderAriaExpanded, textAriaExpanded } from '../options';
// dark:border-black dark:border-opacity-40 border-b-frame-200
const baseVariant = mergeConfigs(textAriaExpanded, {
    $base: 'aria-expanded:text-white',
    light: 'dark:aria-expanded:text-[color:var(--text-light)]',
    dark: 'dark:aria-expanded:text-[color:var(--text-light)]'
});
export const accordionButton = {
    outlined: { ...baseVariant },
    flushed: mergeConfigs(textAriaExpanded, borderAriaExpanded, {
        $base: '',
        light: 'dark:aria-expanded:text-[color:var(--text-light)]',
        dark: 'dark:aria-expanded:text-[color:var(--text-light)]'
    }),
    filled: mergeConfigs(textAriaExpanded, bgAriaExpanded, {
        $base: 'bg-frame-100 dark:bg-frame-500/30 aria-expanded:bg-frame-200 aria-expanded:text-white dark:aria-expanded:text-white',
        light: 'dark:aria-expanded:text-[color:var(--text-light)]',
        dark: 'dark:aria-expanded:text-[color:var(--text-light)] dark:aria-expanded:bg-frame-900/80'
    }),
    glass: mergeConfigs(textAriaExpanded, bgAriaGlassExpanded, {
        $base: 'bg-frame-100 dark:bg-frame-500/10 dark:aria-expanded:text-white ',
        light: 'dark:aria-expanded:text-[color:var(--text-light)]',
        dark: 'dark:aria-expanded:text-[color:var(--text-light)]'
    })
};
