import { mergeConfigs } from '../../theme';
export const textFilled = {
    $base: '',
    default: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
    dark: 'text-[color:var(--text-light)]',
    primary: 'text-white',
    secondary: 'text-white',
    tertiary: 'text-white',
    danger: 'text-white',
    warning: 'text-white',
    success: 'text-white',
    info: 'text-white'
};
export const bgFilled = {
    $base: '',
    default: 'bg-frame-100 dark:bg-frame-600',
    dark: 'bg-frame-600 dark:bg-frame-700',
    primary: 'bg-primary-500 ',
    secondary: 'bg-secondary-500',
    tertiary: 'bg-tertiary-500',
    danger: 'bg-danger-500',
    warning: 'bg-warning-500',
    success: 'bg-success-500',
    info: 'bg-info-500'
};
export const variantFilled = mergeConfigs(textFilled, bgFilled);
export const variantFilledHover = mergeConfigs(variantFilled, {
    $base: '',
    default: 'hover:bg-frame-200/70 dark:hover:bg-frame-700',
    dark: 'hover:bg-frame-700 dark:hover:bg-frame-900/20',
    primary: 'hover:bg-primary-600',
    secondary: 'hover:bg-secondary-600',
    tertiary: 'hover:bg-tertiary-600',
    danger: 'hover:bg-danger-600',
    warning: 'hover:bg-warning-600',
    success: 'hover:bg-success-600',
    info: 'hover:bg-info-600'
});
