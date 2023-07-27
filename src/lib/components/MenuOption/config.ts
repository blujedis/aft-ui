const baseVariant = {
	$base: 'text-frame-600 hover:bg-frame-100 aria-selected:bg-frame-100 aria-current:bg-frame-100',
	dark: 'hover:text-frame-200 aria-selected:text-white aria-current:text-white',
	light: 'hover:text-frame-900 aria-selected:bg-frame-100 aria-current:bg-frame-100',
	primary: 'hover:text-primary-600 aria-selected:text-primary-600 aria-current:text-primary-600',
	secondary:
		'hover:text-secondary-600 aria-selected:text-secondary-600 aria-current:text-secondary-600',
	tertiary:
		'hover:text-tertiary-600 aria-selected:text-tertiary-600 aria-current:text-tertiary-600',
	danger: 'hover:text-danger-600 aria-selected:text-danger-600 aria-current:text-danger-600',
	warning: 'hover:text-warning-600 aria-selected:text-warning-600 aria-current:text-warning-600',
	success: 'hover:text-success-600 aria-selected:text-success-600 aria-current:text-success-600',
	info: 'hover:text-info-600 aria-selected:text-info-600 aria-current:text-info-600'
};
export const menuOption = {
	default: { ...baseVariant },
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant }
};
