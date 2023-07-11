// $base: 'text-white hover:text-white',
// white:
// 	'bg-white hover:bg-default-100 border-white aria-checked:bg-default-200 text-inherit hover:text-inherit aria-checked:text-inherit',
// default: 'bg-default-200 hover:bg-default-300 border-default-400 aria-checked:bg-default-200',
// primary: 'bg-primary-500 hover:bg-primary-600 border-primary-400 aria-checked:bg-primary-600',
// secondary:
// 	'bg-secondary-500 hover:bg-secondary-600 border-secondary-400 aria-checked:bg-secondary-600',
// tertiary:
// 	'bg-tertiary-500 hover:bg-tertiary-600 border-tertiary-400 aria-checked:bg-tertiary-600',
// danger: 'bg-danger-500 hover:bg-danger-600 border-danger-400 aria-checked:bg-danger-600',
// warning: 'bg-warning-500 hover:bg-warning-600 border-warning-400 aria-checked:bg-warning-600',
// success: 'bg-success-500 hover:bg-success-600 border-success-400 aria-checked:bg-success-600',
// info: 'bg-info-500 hover:bg-info-600 border-info-400 aria-checked:bg-info-600'

const baseVariant = {
	$base: 'text-white hover:text-white aria-checked:text-white',
	white: 'aria-checked:bg-default-200',
	default:
		'text-default-700 hover:text-current aria-checked:bg-default-400 aria-checked:ring-default-400',
	primary: 'aria-checked:bg-primary-600 aria-checked:ring-primary-600',
	secondary: 'aria-checked:bg-secondary-600 aria-checked:ring-secondary-600',
	tertiary: 'aria-checked:bg-tertiary-600 aria-checked:ring-tertiary-600',
	danger: 'aria-checked:bg-danger-600 aria-checked:ring-danger-600',
	warning: 'aria-checked:bg-warning-600 aria-checked:ring-warning-600',
	success: 'aria-checked:bg-success-600 aria-checked:ring-success-600',
	info: 'aria-checked:bg-info-600 aria-checked:ring-info-600'
};

export const buttonGroupItem = {
	default: {
		...baseVariant
	},
	filled: {
		...baseVariant
	},
	outlined: {
		$base: 'bg-white aria-checked:text-white',
		white: 'aria-checked:bg-default-200 aria-checked:ring-default-200',
		default: 'aria-checked:bg-default-400 aria-checked:ring-default-400',
		primary: 'aria-checked:bg-primary-600 aria-checked:ring-primary-600',
		secondary: 'aria-checked:bg-secondary-600 aria-checked:ring-secondary-600',
		tertiary: 'aria-checked:bg-tertiary-600 aria-checked:ring-tertiary-600',
		danger: 'aria-checked:bg-danger-600 aria-checked:ring-danger-600',
		warning: 'aria-checked:bg-warning-600 aria-checked:ring-warning-600',
		success: 'aria-checked:bg-success-600 aria-checked:ring-success-600',
		info: 'aria-checked:bg-info-600 aria-checked:ring-info-600'
	},
	text: {
		$base: 'no-underline aria-checked:underline',
		white: 'aria-checked:text-default-200',
		default: 'aria-checked:text-default-900',
		secondary: 'aria-checked:text-secondary-700',
		tertiary: 'aria-checked:text-tertiary-700',
		danger: 'aria-checked:text-danger-700',
		warning: 'aria-checked:text-warning-700',
		success: 'aria-checked:text-success-700',
		info: 'aria-checked:text-info-700'
	},
	ghost: {
		$base: 'aria-checked:text-white',
		white: 'hover:bg-default-200 aria-checked:bg-default-200 aria-checked:text-inherit',
		default: 'aria-checked:bg-default-400 aria-checked:ring-default-400',
		primary: 'aria-checked:bg-primary-500 aria-checked:ring-primary-500',
		secondary: 'aria-checked:bg-secondary-500 aria-checked:ring-secondary-500',
		tertiary: 'aria-checked:bg-tertiary-500 aria-checked:ring-tertiary-500',
		danger: 'aria-checked:bg-danger-500 aria-checked:ring-danger-500',
		warning: 'aria-checked:bg-warning-500 aria-checked:ring-warning-500',
		success: 'aria-checked:bg-success-500 aria-checked:ring-success-500',
		info: 'aria-checked:bg-info-500 aria-checked:ring-info-500'
	}
};
