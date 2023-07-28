import { mergeConfigs } from '$lib/theme';

export const variantFilled = {
	$base: 'text-white border border-transparent ring-1',
	dark: 'text-frame-200 bg-frame-700 hover:bg-frame-800 ring-frame-700',
	light: 'text-frame-700 bg-frame-200 hover:bg-frame-300 ring-frame-200 hover:ring-frame-300',
	primary: 'bg-primary-500 hover:bg-primary-600 ring-primary-500 hover:ring-primary-600',
	secondary: 'bg-secondary-500 hover:bg-secondary-600 ring-secondary-500 hover:ring-secondary-600',
	tertiary: 'bg-tertiary-500 hover:bg-tertiary-600 ring-tertiary-500 hover:ring-tertiary-600',
	danger: 'bg-danger-500 hover:bg-danger-600 ring-danger-500 hover:ring-danger-600',
	warning: 'bg-warning-500 hover:bg-warning-600 ring-warning-500 hover:ring-warning-600',
	success: 'bg-success-500 hover:bg-success-600 ring-success-500 hover:ring-success-600',
	info: 'bg-info-500 hover:bg-info-600 ring-info-500 hover:ring-info-600'
};

export const variantText = {
	$base: 'text-frame-700 hover:text-frame-900 border-0 bg-transparent',
	dark: 'text-frame-700 hover:text-frame-900',
	light: 'text-frame-700 hover:text-frame-900',
	primary: 'text-primary-600 hover:text-primary-700',
	secondary: 'text-secondary-600 hover:text-secondary-700',
	tertiary: 'text-tertiary-600 hover:text-tertiary-700',
	danger: 'text-danger-600 hover:text-danger-700',
	warning: 'text-warning-600 hover:text-warning-700',
	success: 'text-success-600 hover:text-success-700',
	info: 'text-info-600 hover:text-info-700'
};

export const variantOutlined = mergeConfigs(variantText, {
	$base: 'bg-transparent ring-1 border border-transparent',
	dark: 'ring-frame-700 hover:ring-frame-800',
	light: 'ring-frame-300 hover:ring-frame-400',
	primary: 'ring-primary-500 hover:ring-primary-600',
	secondary: 'ring-secondary-500 hover:ring-secondary-600',
	tertiary: 'ring-tertiary-500 hover:ring-tertiary-600',
	danger: 'ring-danger-500 hover:ring-danger-600',
	warning: 'ring-warning-500 hover:ring-warning-600',
	success: 'ring-success-500 hover:ring-success-600',
	info: 'ring-info-500 hover:ring-info-600'
});

export const variantGhost = mergeConfigs(variantText, {
	$base:
		'text-frame-700 hover:text-frame-900 border border-transparent bg-transparent hover:ring-1',
	dark: 'hover:bg-frame-700 hover:ring-frame-700 hover:text-white',
	light: 'hover:bg-frame-200 hover:ring-frame-200',
	primary: 'hover:bg-primary-100 hover:ring-primary-100',
	secondary: 'hover:bg-secondary-100 hover:ring-secondary-100',
	tertiary: 'hover:bg-tertiary-100 hover:ring-tertiary-100',
	danger: 'hover:bg-danger-100 hover:ring-danger-100',
	warning: 'hover:bg-warning-100 hover:ring-warning-100',
	success: 'hover:bg-success-100 hover:ring-success-100',
	info: 'hover:bg-info-100 hover:ring-info-100'
});

export const variantFlushed = {
	$base: 'text-frame-700 border border-l-0 border-r-0 border-t-0',
	dark: 'border-frame-700 hover:border-frame-800',
	light: 'border-frame-300 hover:border-frame-400',
	primary: 'text-primary-600 border-primary-500 hover:border-primary-600',
	secondary: 'text-secondary-600 border-secondary-500 hover:border-secondary-600',
	tertiary: 'text-tertiary-600 border-tertiary-500 hover:border-tertiary-600',
	danger: 'text-danger-600 border-danger-500 hover:border-danger-600',
	warning: 'text-warning-600 border-warning-500 hover:border-warning-600',
	success: 'text-success-600 border-success-500 hover:border-success-600',
	info: 'text-info-600 border-info-500 hover:border-info-600'
};

export const button = {
	default: {
		...variantFilled
	},
	filled: {
		...variantFilled
	},
	outlined: {
		...variantOutlined
	},
	text: {
		...variantText
	},
	ghost: {
		...variantGhost
	}
};
