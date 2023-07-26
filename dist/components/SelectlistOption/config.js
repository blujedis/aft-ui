const baseVariant = {
    $base: 'text-default-600 hover:bg-default-100 aria-selected:bg-default-100 aria-current:bg-default-100',
    white: 'hover:text-default-200 aria-selected:text-white aria-current:text-white',
    default: 'hover:text-default-900 aria-selected:text-default-900 aria-current:text-default-900',
    primary: 'hover:text-primary-600 aria-selected:text-primary-600 aria-current:text-primary-600',
    secondary: 'hover:text-secondary-600 aria-selected:text-secondary-600 aria-current:text-secondary-600',
    tertiary: 'hover:text-tertiary-600 aria-selected:text-tertiary-600 aria-current:text-tertiary-600',
    danger: 'hover:text-danger-600 aria-selected:text-danger-600 aria-current:text-danger-600',
    warning: 'hover:text-warning-600 aria-selected:text-warning-600 aria-current:text-warning-600',
    success: 'hover:text-success-600 aria-selected:text-success-600 aria-current:text-success-600',
    info: 'hover:text-info-600 aria-selected:text-info-600 aria-current:text-info-600'
};
export const selectListOption = {
    default: { ...baseVariant },
    filled: { ...baseVariant },
    outlined: { ...baseVariant },
    text: { ...baseVariant },
    ghost: { ...baseVariant },
    flushed: { ...baseVariant }
};
