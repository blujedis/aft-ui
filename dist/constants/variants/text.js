import { mergeConfigs } from '../../theme';
export const text = {
    $base: 'border-0 bg-transparent',
    default: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
    dark: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
    primary: 'text-primary-500',
    secondary: 'text-secondary-500',
    tertiary: 'text-tertiary-500',
    danger: 'text-danger-500',
    warning: 'text-warning-500',
    success: 'text-success-500',
    info: 'text-info-500'
};
export const textHover = {
    $base: 'border-0 bg-transparent',
    default: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
    dark: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
    primary: 'hover:text-primary-700',
    secondary: 'hover:text-secondary-700',
    tertiary: 'hover:text-tertiary-700',
    danger: 'hover:text-danger-700',
    warning: 'hover:text-warning-700',
    success: 'hover:text-success-700',
    info: 'hover:text-info-700'
};
export const variantText = { ...text };
export const variantTextHover = mergeConfigs(variantText, textHover);
///////////////////////////////////////////////
export const textExpanded = {
    default: 'aria-expanded:text-[color:var(--text-dark)] dark:aria-expanded:text-[color:var(--text-light)]',
    dark: 'aria-expanded:text-[color:var(--text-light)] dark:aria-expanded:text-[color:var(--text-light)]',
    primary: 'aria-expanded:text-primary-700',
    secondary: 'aria-expanded:text-secondary-700',
    tertiary: 'aria-expanded:text-tertiary-700',
    danger: 'aria-expanded:text-danger-700',
    warning: 'aria-expanded:text-warning-700',
    success: 'aria-expanded:text-success-700',
    info: 'aria-expanded:text-info-700'
};
export const textSelected = {
    default: 'aria-selected:text-[color:var(--text-dark)]',
    dark: 'aria-selected:text-[color:var(--text-light)]',
    primary: 'aria-selected:text-primary-700 dark:aria-selected:text-primary-500',
    secondary: 'aria-selected:text-secondary-700 dark:aria-selected:text-secondary-500',
    tertiary: 'aria-selected:text-tertiary-700 dark:aria-selected:text-tertiary-500',
    danger: 'aria-selected:text-danger-700 dark:aria-selected:text-danger-500',
    warning: 'aria-selected:text-warning-700 dark:aria-selected:text-warning-500',
    success: 'aria-selected:text-success-700 dark:aria-selected:text-success-500',
    info: 'aria-selected:text-info-700 dark:aria-selected:text-info-500'
};
export const textCurrent = {
    default: 'aria-current:text-[color:var(--text-dark)]',
    dark: 'aria-current:text-[color:var(--text-light)]',
    primary: 'aria-current:text-primary-700 dark:aria-current:text-primary-500',
    secondary: 'aria-current:text-secondary-700 dark:aria-current:text-secondary-500',
    tertiary: 'aria-current:text-tertiary-700 dark:aria-current:text-tertiary-500',
    danger: 'aria-current:text-danger-700 dark:aria-current:text-danger-500',
    warning: 'aria-current:text-warning-700 dark:aria-current:text-warning-500',
    success: 'aria-current:text-success-700 dark:aria-current:text-success-500',
    info: 'aria-current:text-info-700  dark:aria-current:text-info-500'
};
///////////////////////////////////////////////
// export const textAriaSelectedSoft = {
// 	default: 'aria-selected:text-frame-300  dark:aria-selected:text-frame-500',
// 	dark: 'aria-selected:text-frame-300 dark:aria-selected:text-frame-600',
// 	primary: 'aria-selected:text-primary-300 dark:aria-selected:text-primary-700',
// 	secondary: 'aria-selected:text-secondary-300 dark:aria-selected:text-secondary-700',
// 	tertiary: 'aria-selected:text-tertiary-300 dark:aria-selected:text-tertiary-700',
// 	danger: 'aria-selected:text-danger-300 dark:aria-selected:text-danger-700',
// 	warning: 'aria-selected:text-warning-300 dark:aria-selected:text-warning-700',
// 	success: 'aria-selected:text-success-300 dark:aria-selected:text-success-700',
// 	info: 'aria-selected:text-info-300 dark:aria-selected:text-info-700'
// };
