import { bgAriaSelected, borderAriaSelected, solidGlassHover, textAriaSelected, textHover } from '../../constants';
import { mergeConfigs } from '../../theme';
const baseVariant = mergeConfigs(textHover, borderAriaSelected, {
    $base: 'border-transparent border-b-2 border-x-0 border-t-0 rounded-br-none rounded-bl-none'
});
const filledVariant = mergeConfigs(textHover, bgAriaSelected, {
    white: 'aria-selected:text-[color:var(--text-dark)]',
    light: 'aria-selected:text-[color:var(--text-dark)]',
    $base: 'aria-selected:text-white'
});
const groupedVariant = mergeConfigs(solidGlassHover, bgAriaSelected, {
    $base: 'border border-frame-200 dark:border-black dark:border-opacity-40 aria-selected:text-white',
    white: 'aria-selected:text-[color:var(--text-dark)]',
    light: 'aria-selected:text-[color:var(--text-dark)]'
});
const labeledVariant = mergeConfigs(textAriaSelected, {
    $base: '-mb-px  border border-transparent aria-selected:border-frame-200 dark:aria-selected:border-black dark:border-opacity-40 aria-selected:border-b-[color:var(--bg-light)] dark:aria-selected:border-b-[color:var(--bg-dark)] aria-selected:font-medium',
    white: 'dark:text-[color:var(--text-light)]',
    light: 'dark:text-[color:var(--text-light)]',
    dark: 'aria-selected:text-[color:var(--text-dark)] dark:aria-selected:text-[color:var(--text-light)]'
});
export const tab = {
    flushed: {
        ...baseVariant
    },
    filled: {
        ...filledVariant
    },
    grouped: {
        ...groupedVariant
    },
    labeled: {
        ...labeledVariant
    }
};
