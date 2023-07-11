const defaultBreadcrumbOption = {
    $base: '',
    white: 'text-white hover:text-white aria-selected:text-white',
    default: 'text-default-700 hover:text-default-950 aria-selected:text-default-500',
    primary: 'text-primary-600 hover:text-primary-800 aria-selected:text-primary-400',
    secondary: 'text-secondary-600 hover:text-secondary-800 aria-selected:text-secondary-400',
    tertiary: 'text-tertiary-600 hover:text-tertiary-800 aria-selected:text-tertiary-400',
    danger: 'text-danger-600 hover:text-danger-800 aria-selected:text-danger-400',
    warning: 'text-warning-600 hover:text-warning-800 aria-selected:text-warning-400',
    success: 'text-success-600 hover:text-success-800 aria-selected:text-success-400',
    info: 'text-info-600 hover:text-info-800 aria-selected:text-info-400'
};
export const breadcrumbOption = {
    default: {
        ...defaultBreadcrumbOption
    },
    unfilled: {
        ...defaultBreadcrumbOption
    },
    filled: {
        $base: 'text-white',
        white: 'text-default-600 hover:text-white aria-selected:text-white',
        default: 'text-default-700 hover:text-default-950 aria-selected:text-default-500/90',
        primary: 'hover:text-primary-100 aria-selected:text-primary-200',
        secondary: 'hover:text-secondary-100 aria-selected:text-secondary-200',
        tertiary: 'hover:text-tertiary-100 aria-selected:text-tertiary-200',
        danger: 'hover:text-danger-100 aria-selected:text-danger-200',
        warning: 'hover:text-warning-100 aria-selected:text-warning-200',
        success: 'hover:text-success-100 aria-selected:text-success-200',
        info: 'hover:text-info-100 aria-selected:text-info-200'
    }
};
const defaultBreadcrumbOptionItem = {
    $base: '',
    white: 'text-white',
    default: 'text-default-600',
    primary: 'text-primary-600',
    secondary: 'text-secondary-600',
    tertiary: 'text-tertiary-600',
    danger: 'text-danger-600',
    warning: 'text-warning-600',
    success: 'text-success-600',
    info: 'text-info-600'
};
export const breadcrumbOptionItem = {
    default: {
        ...defaultBreadcrumbOptionItem
    },
    unfilled: {
        ...defaultBreadcrumbOptionItem
    },
    filled: {
        $base: 'text-white',
        white: 'text-default-600',
        default: 'text-default-600',
        primary: '',
        secondary: '',
        tertiary: '',
        danger: '',
        warning: '',
        success: '',
        info: ''
    }
};
