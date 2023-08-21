import { mergeConfigs } from '../../theme';
export const textGhost = {
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
export const textGhostHover = mergeConfigs(textGhost, {
    $base: 'text-inherit dark:text-[color:var(--text-light)]',
    dark: 'hover:text-[color:var(--text-light)]'
});
export const ghost = {
    $base: 'bg-transparent',
    default: 'bg-frame-100 dark:bg-frame-500/50',
    dark: 'bg-frame-600/60 dark:bg-frame-600/10',
    primary: 'bg-primary-100 dark:bg-primary-500/50',
    secondary: 'bg-secondary-100 dark:bg-secondary-500/50',
    tertiary: 'bg-tertiary-100 dark:bg-tertiary-500/50',
    danger: 'bg-danger-100 dark:bg-danger-500/50',
    warning: 'bg-warning-100 dark:bg-warning-500/50',
    success: 'bg-success-100 dark:bg-success-500/50',
    info: 'bg-info-100 dark:bg-info-500/50'
};
export const ghostHover = {
    $base: 'bg-transparent',
    default: 'hover:bg-frame-100 dark:hover:bg-frame-500/50',
    dark: 'hover:bg-frame-400 dark:hover:bg-frame-900/40',
    primary: 'hover:bg-primary-100 dark:hover:bg-primary-500/50',
    secondary: 'hover:bg-secondary-100 dark:hover:bg-secondary-500/50',
    tertiary: 'hover:bg-tertiary-100 dark:hover:bg-tertiary-500/50',
    danger: 'hover:bg-danger-100 dark:hover:bg-danger-500/50',
    warning: 'hover:bg-warning-100 dark:hover:bg-warning-500/50',
    success: 'hover:bg-success-100 dark:hover:bg-success-500/50',
    info: 'hover:bg-info-100 dark:hover:bg-info-500/50'
};
export const variantGhost = mergeConfigs(textGhost, ghost);
export const variantGhostHover = mergeConfigs(textGhostHover, ghostHover);
