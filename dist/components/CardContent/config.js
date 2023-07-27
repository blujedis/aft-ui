import { placeholder } from '../placeholder';
export const cardContent = {
    default: { ...placeholder },
    filled: {
        $base: 'text-white',
        white: 'bg-white text-inherit',
        frame: 'bg-frame-200 text-inherit',
        primary: 'bg-primary-500',
        secondary: 'bg-secondary-500',
        tertiary: 'bg-tertiary-500',
        danger: 'bg-danger-500',
        warning: 'bg-warning-500',
        success: 'bg-success-500',
        info: 'bg-info-500'
    },
    soft: {
        $base: 'text-inherit',
        white: 'bg-white',
        frame: 'bg-frame-100 text-frame-600',
        primary: 'bg-primary-50 text-primary-600',
        secondary: 'bg-secondary-50 text-secondary-600',
        tertiary: 'bg-tertiary-50 text-tertiary-600',
        danger: 'bg-danger-50 text-danger-600',
        warning: 'bg-warning-50 text-warning-600',
        success: 'bg-success-50 text-success-600',
        info: 'bg-info-50 text-info-600'
    }
};
