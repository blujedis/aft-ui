import { mergeConfigs } from '../../theme';
export const textDefault = {
    $base: '',
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
export const baseDefault = {
    $base: 'bg-frame-100 dark:bg-frame-500/50',
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
export const variantDefault = mergeConfigs(textDefault, baseDefault);
