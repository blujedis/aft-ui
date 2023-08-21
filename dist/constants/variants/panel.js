import { mergeConfigs } from '../../theme';
import { common } from '../options';
export const textPanel = {
    $base: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
    default: '',
    dark: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const textPanelItemHover = {
    $base: 'hover:text-[color:var(--text-light)]',
    default: 'hover:text-inherit',
    dark: '',
    primary: '',
    secondary: '',
    tertiary: '',
    danger: '',
    warning: '',
    success: '',
    info: ''
};
export const panelItemHoverFilled = {
    $base: '',
    default: 'hover:bg-frame-100 dark:hover:bg-frame-500/50',
    dark: 'hover:bg-frame-600 dark:hover:bg-frame-800',
    primary: 'hover:bg-primary-500',
    secondary: 'hover:bg-secondary-500',
    tertiary: 'hover:bg-tertiary-500',
    danger: 'hover:bg-danger-500',
    warning: 'hover:bg-warning-500',
    success: 'hover:bg-success-500',
    info: 'hover:bg-info-500'
};
export const variantPanel = mergeConfigs(textPanel, {
    $base: ['bg-white dark:bg-frame-700', common.ringed].join(' ')
});
export const variantPanelItemHover = mergeConfigs(textPanelItemHover, panelItemHoverFilled);
