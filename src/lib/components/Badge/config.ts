const baseVariant = {
	$base: 'text-white font-medium border border-transparent',
	white: 'bg-white text-inherit',
	frame: 'bg-frame-200 text-inherit',
	primary: 'bg-primary-500',
	secondary: 'bg-secondary-500',
	tertiary: 'bg-tertiary-500',
	danger: 'bg-danger-500',
	warning: 'bg-warning-500',
	success: 'bg-success-500',
	info: 'bg-info-500'
};

export const badge = {
	default: { ...baseVariant },
	filled: { ...baseVariant },
	outlined: {
		$base: 'border font-medium',
		white: 'border-white text-white',
		frame: 'border-frame-300 text-frame-600',
		primary: 'border-primary-500 text-primary-600',
		secondary: 'border-secondary-500 text-secondary-600',
		tertiary: 'border-tertiary-500 text-tertiary-600',
		danger: 'border-danger-500 text-danger-600',
		warning: 'border-warning-500 text-warning-600',
		success: 'border-success-500 text-success-600',
		info: 'border-info-500 text-info-600'
	}
};
