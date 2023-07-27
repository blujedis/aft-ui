const baseVariant = {
    $base: 'aria-selected:text-white text-frame-500 hover:text-frame-800  aria-selected:text-white',
    dark: 'hover:bg-frame-200 aria-selected:bg-frame-200 hover:text-frame-200 aria-selected:text-inherit',
    light: 'hover:bg-frame-200 aria-selected:bg-frame-200 aria-selected:text-frame-900',
    primary: 'hover:bg-primary-200 aria-selected:bg-primary-600 hover:text-primary-800',
    secondary: 'hover:bg-secondary-200 aria-selected:bg-secondary-600 hover:text-secondary-800',
    tertiary: 'hover:bg-tertiary-200 aria-selected:bg-tertiary-600 hover:text-tertiary-800',
    danger: 'hover:bg-danger-200 aria-selected:bg-danger-600 hover:text-danger-800',
    warning: 'hover:bg-warning-200 aria-selected:bg-warning-600 hover:text-warning-800',
    success: 'hover:bg-success-200 aria-selected:bg-success-600 hover:text-success-800',
    info: 'hover:bg-info-200 aria-selected:bg-info-600 hover:text-info-800'
};
export const paginationPage = {
    default: {
        ...baseVariant
    },
    grouped: {
        ...baseVariant
    },
    flushed: {
        $base: 'hover:text-inherit border-transparent text-frame-500 aria-selected:text-frame-800 hover:text-frame-800',
        dark: 'hover:text-frame-200 aria-selected:text-white aria-selected:border-frame-200',
        light: 'aria-selected:border-frame-500 ',
        primary: 'hover:text-primary-800 aria-selected:text-primary-800 aria-selected:border-primary-600',
        secondary: 'hover:text-secondary-800 aria-selected:text-secondary-800 aria-selected:border-secondary-600',
        tertiary: 'hover:text-tertiary-800 aria-selected:text-tertiary-800 aria-selected:border-tertiary-600',
        danger: 'hover:text-danger-800 aria-selected:text-danger-800 aria-selected:border-danger-600',
        warning: 'hover:text-warning-800 aria-selected:text-warning-800 aria-selected:border-warning-600',
        success: 'hover:text-success-800 aria-selected:text-success-800 aria-selected:border-success-600',
        info: 'hover:text-info-800 aria-selected:text-info-800 aria-selected:border-info-600'
    }
};
