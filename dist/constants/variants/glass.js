import { mergeConfigs } from '../../theme';
export const textGlass = {
    $base: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
    default: '',
    dark: 'text-[color:var(--text-light)]',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const glass = {
    $base: '',
    default: 'bg-frame-500/10 dark:bg-frame-600/30',
    dark: 'bg-frame-600/30 dark:bg-frame-700/20',
    primary: 'bg-primary-500/10',
    secondary: 'bg-secondary-500/10',
    tertiary: 'bg-tertiary-500/10',
    danger: 'bg-danger-500/10',
    warning: 'bg-warning-500/10',
    success: 'bg-success-500/10',
    info: 'bg-info-500/10'
};
export const glassHover = {
    $base: '',
    default: 'hover:bg-frame-500/20 dark:hover:bg-frame-600/60',
    dark: 'hover:bg-frame-600/40 dark:hover:bg-frame-900/40',
    primary: 'hover:bg-primary-500/20',
    secondary: 'hover:bg-secondary-500/20',
    tertiary: 'hover:bg-tertiary-500/20',
    danger: 'hover:bg-danger-500/20',
    warning: 'hover:bg-warning-500/20',
    success: 'hover:bg-success-500/20',
    info: 'hover:bg-info-500/20'
};
export const variantGlass = mergeConfigs(textGlass, glass, {
    dark: 'text-[color:var(--text-dark)]'
});
export const variantGlassHover = mergeConfigs(variantGlass, glassHover);
