const baseVariant = {
	$base: 'aria-expanded:border-b border-b-frame-200 rounded-none',
	dark: 'aria-expanded:text-frame-200',
	light: 'aria-expanded:text-frame-800',
	primary: 'aria-expanded:text-primary-500',
	secondary: 'aria-expanded:text-secondary-500',
	tertiary: 'aria-expanded:text-tertiary-500',
	danger: 'aria-expanded:text-danger-500',
	warning: 'aria-expanded:text-warning-500',
	success: 'aria-expanded:text-success-500',
	info: 'aria-expanded:text-info-500'
};

export const accordionButton = {
	default: { ...baseVariant },
	outlined: { ...baseVariant },
	flushed: {
		$base: 'border-b border-frame-200',
		dark: 'aria-expanded:text-white',
		light: 'aria-expanded:text-frame-900',
		primary: 'aria-expanded:text-primary-500',
		secondary: 'aria-expanded:text-secondary-500',
		tertiary: 'aria-expanded:text-tertiary-500',
		danger: 'aria-expanded:text-danger-500',
		warning: 'aria-expanded:text-warning-500',
		success: 'aria-expanded:text-success-500',
		info: 'aria-expanded:text-info-500'
	},
	pills: {
		$base: 'aria-expanded:text-white bg-frame-100',
		dark: 'aria-expanded:text-inherit aria-expanded:bg-frame-200',
		light: 'aria-expanded:text-inherit aria-expanded:bg-frame-200',
		primary: 'aria-expanded:bg-primary-500',
		secondary: 'aria-expanded:bg-secondary-500',
		tertiary: 'aria-expanded:bg-tertiary-500',
		danger: 'aria-expanded:bg-danger-500',
		warning: 'aria-expanded:bg-warning-500',
		success: 'aria-expanded:bg-success-500',
		info: 'aria-expanded:bg-info-500'
	}
};
