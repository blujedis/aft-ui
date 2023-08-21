import { mergeConfigs } from '../../theme';
//////////////////////////////////////////////////
////////             RINGED               ////////
//////////////////////////////////////////////////
export const textOutlined = {
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
export const ring = {
    $base: 'ring-inset ring-1',
    default: 'ring-frame-200 dark:ring-frame-600',
    dark: 'ring-frame-600 dark:ring-frame-700',
    primary: 'ring-primary-500',
    secondary: 'ring-secondary-500',
    tertiary: 'ring-tertiary-500',
    danger: 'ring-danger-500',
    warning: 'ring-warning-500',
    success: 'ring-success-500',
    info: 'ring-info-500'
};
export const ringHover = {
    $base: 'ring-inset ring-1',
    default: 'hover:ring-frame-300 dark:hover:ring-frame-700',
    dark: 'hover:ring-frame-700 dark:hover:ring-frame-900',
    primary: 'hover:ring-primary-700 dark:hover:ring-primary-700',
    secondary: 'hover:ring-secondary-700 dark:hover:ring-secondary-700',
    tertiary: 'hover:ring-tertiary-700 dark:hover:ring-tertiary-700',
    danger: 'hover:ring-danger-700 dark:hover:ring-danger-700',
    warning: 'hover:ring-warning-700 dark:hover:ring-warning-700',
    success: 'hover:ring-success-700 dark:hover:ring-success-700',
    info: 'hover:ring-info-700 dark:hover:ring-info-700'
};
export const variantOutlined = mergeConfigs(textOutlined, ring, { $base: 'bg-transparent' });
export const variantOutlinedHover = mergeConfigs(variantOutlined, ringHover);
//////////////////////////////////////////////////
////////           BORDERED               ////////
//////////////////////////////////////////////////
export const border = {
    $base: 'border',
    default: 'border-frame-200 dark:border-frame-600',
    dark: 'border-frame-600 dark:border-frame-700',
    primary: 'border-primary-500',
    secondary: 'border-secondary-500',
    tertiary: 'border-tertiary-500',
    danger: 'border-danger-500',
    warning: 'border-warning-500',
    success: 'border-success-500',
    info: 'border-info-500'
};
export const borderHover = {
    $base: 'border',
    default: 'hover:border-frame-300 dark:hover:border-frame-700',
    dark: 'hover:border-frame-700 dark:hover:border-frame-900',
    primary: 'hover:border-primary-700 dark:hover:border-primary-700',
    secondary: 'hover:border-secondary-700 dark:hover:border-secondary-700',
    tertiary: 'hover:border-tertiary-700 dark:hover:border-tertiary-700',
    danger: 'hover:border-danger-700 dark:hover:border-danger-700',
    warning: 'hover:border-warning-700 dark:hover:border-warning-700',
    success: 'hover:border-success-700 dark:hover:border-success-700',
    info: 'hover:border-info-700 dark:hover:border-info-700'
};
export const borderHoverGroup = {
    $base: 'group',
    default: 'group-hover:border-frame-300 dark:group-hover:border-frame-700',
    dark: 'group-hover:border-frame-700 dark:group-hover:border-dark-700',
    primary: 'group-hover:border-primary-700 dark:group-hover:border-primary-700',
    secondary: 'group-hover:border-secondary-700 dark:group-hover:border-secondary-700',
    tertiary: 'group-hover:border-tertiary-700 dark:group-hover:border-tertiary-700',
    danger: 'group-hover:border-danger-700 dark:group-hover:border-danger-700',
    warning: 'group-hover:border-warning-700 dark:group-hover:border-warning-700',
    success: 'group-hover:border-success-700 dark:group-hover:border-success-700',
    info: 'group-hover:border-info-700 dark:group-hover:border-info-700'
};
export const variantBorder = mergeConfigs(textOutlined, border);
export const variantBorderHover = mergeConfigs(variantBorder, borderHover);
export const variantBorderHoverGroup = mergeConfigs(variantBorder, borderHoverGroup);
