import { placeholder } from '../placeholder';
export const notification = {
    default: {
        $base: 'border-r-0 border-y-0',
        dark: 'border-white',
        light: 'border-frame-200',
        primary: 'border-primary-500',
        secondary: 'border-secondary-500',
        tertiary: 'border-tertiary-500',
        danger: 'border-danger-500',
        warning: 'border-warning-500',
        success: 'border-success-500',
        info: 'border-info-500'
    }
};
export const notificationIcon = {
    default: {
        $base: 'text-inherit',
        dark: 'text-white',
        light: 'text-frame-600',
        primary: 'text-primary-600',
        secondary: 'text-secondary-600',
        tertiary: 'text-tertiary-600',
        danger: 'text-danger-600',
        warning: 'text-warning-600',
        success: 'text-success-600',
        info: 'text-info-600'
    }
};
export const notificationTitle = {
    default: { ...placeholder, $base: 'font-bold' }
};
