import { placeholder } from '../../constants';
export const paginationPage = {
    filled: {
        ...placeholder,
        $base: 'text-frame-500 aria-selected:text-white',
        default: 'aria-selected:text-[color:var(--text-dark)]'
    },
    flushed: {
        $base: 'dark:border-black dark:border-opacity-40 aria-selected:border-opacity-100',
        dark: 'aria-selected:border-frame-600'
    },
    ghost: {
        $base: 'text-frame-500 aria-selected:text-white'
    }
};
