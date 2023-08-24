import { mergeConfigs } from '$lib/theme';

const textOutlined = {
	$base: '',
	default: '',
	dark: '',
	primary: 'text-primary-500',
	secondary: 'text-secondary-500',
	tertiary: 'text-tertiary-500',
	danger: 'text-danger-500',
	warning: 'text-warning-500',
	success: 'text-success-500',
	info: 'text-info-500'
};

export const ring = {
	$base: 'ring-inset ring-1',
	default: 'ring-frame-200 dark:ring-frame-500',
	dark: 'ring-frame-500 dark:ring-frame-800',
	primary: 'ring-primary-500',
	secondary: 'ring-secondary-500',
	tertiary: 'ring-tertiary-500',
	danger: 'ring-danger-500',
	warning: 'ring-warning-500',
	success: 'ring-success-500',
	info: 'ring-info-500'
};

const ringHover = {
	$base: 'ring-inset ring-1',
	default: 'hover:ring-frame-300 dark:hover:ring-frame-500',
	dark: 'hover:ring-frame-600 dark:hover:ring-frame-900',
	primary: 'hover:ring-primary-700 dark:hover:ring-primary-700',
	secondary: 'hover:ring-secondary-700 dark:hover:ring-secondary-700',
	tertiary: 'hover:ring-tertiary-700 dark:hover:ring-tertiary-700',
	danger: 'hover:ring-danger-700 dark:hover:ring-danger-700',
	warning: 'hover:ring-warning-700 dark:hover:ring-warning-700',
	success: 'hover:ring-success-700 dark:hover:ring-success-700',
	info: 'hover:ring-info-700 dark:hover:ring-info-700'
};

const ringHoverless = {
	$base: 'ring-inset ring-1',
	default: 'hover:ring-frame-200 dark:hover:ring-frame-500',
	dark: 'hover:ring-frame-500 dark:hover:ring-frame-800',
	primary: 'hover:ring-primary-500 dark:hover:ring-primary-500',
	secondary: 'hover:ring-secondary-500 dark:hover:ring-secondary-500',
	tertiary: 'hover:ring-tertiary-500 dark:hover:ring-tertiary-500',
	danger: 'hover:ring-danger-500 dark:hover:ring-danger-500',
	warning: 'hover:ring-warning-500 dark:hover:ring-warning-500',
	success: 'hover:ring-success-500 dark:hover:ring-success-500',
	info: 'hover:ring-info-500 dark:hover:ring-info-500'
};

const border = {
	$base: 'border',
	default: 'border-frame-200 dark:border-frame-500',
	dark: 'border-frame-500 dark:border-frame-800',
	primary: 'border-primary-500',
	secondary: 'border-secondary-500',
	tertiary: 'border-tertiary-500',
	danger: 'border-danger-500',
	warning: 'border-warning-500',
	success: 'border-success-500',
	info: 'border-info-500'
};

const borderHover = {
	$base: 'border',
	default: 'hover:border-frame-300 dark:hover:border-frame-600',
	dark: 'hover:border-frame-600 dark:hover:border-frame-900',
	primary: 'hover:border-primary-700 dark:hover:border-primary-700',
	secondary: 'hover:border-secondary-700 dark:hover:border-secondary-700',
	tertiary: 'hover:border-tertiary-700 dark:hover:border-tertiary-700',
	danger: 'hover:border-danger-700 dark:hover:border-danger-700',
	warning: 'hover:border-warning-700 dark:hover:border-warning-700',
	success: 'hover:border-success-700 dark:hover:border-success-700',
	info: 'hover:border-info-700 dark:hover:border-info-700'
};

export const borderHoverGroup = {
	$base: 'group',
	default: 'group-hover:border-frame-300 dark:group-hover:border-frame-600',
	dark: 'group-hover:border-frame-600 dark:group-hover:border-dark-900',
	primary: 'group-hover:border-primary-700 dark:group-hover:border-primary-700',
	secondary: 'group-hover:border-secondary-700 dark:group-hover:border-secondary-700',
	tertiary: 'group-hover:border-tertiary-700 dark:group-hover:border-tertiary-700',
	danger: 'group-hover:border-danger-700 dark:group-hover:border-danger-700',
	warning: 'group-hover:border-warning-700 dark:group-hover:border-warning-700',
	success: 'group-hover:border-success-700 dark:group-hover:border-success-700',
	info: 'group-hover:border-info-700 dark:group-hover:border-info-700'
};


const borderExpanded = {
	default: 'aria-expanded:border-frame-200 dark:aria-expanded:border-frame-500',
	dark: 'aria-expanded:border-frame-500 dark:aria-expanded:border-frame-800',
	primary: 'aria-expanded:border-primary-500 dark:aria-expanded:border-primary-500',
	secondary: 'aria-expanded:border-secondary-500 dark:aria-expanded:border-secondary-500',
	tertiary: 'aria-expanded:border-tertiary-500 dark:aria-expanded:border-tertiary-500',
	danger: 'aria-expanded:border-danger-500 dark:aria-expanded:border-danger-500',
	warning: 'aria-expanded:border-warning-500 dark:aria-expanded:border-warning-500',
	success: 'aria-expanded:border-success-500 dark:aria-expanded:border-success-500',
	info: 'aria-expanded:border-info-500 dark:aria-expanded:border-info-500'
};


export const variantOutlined = mergeConfigs(textOutlined, ring, { $base: 'bg-transparent' });

export const variantOutlinedHover = mergeConfigs(variantOutlined, ringHover);

export const variantBorder = mergeConfigs(textOutlined, border);

export const variantBorderHover = mergeConfigs(variantBorder, borderHover);

export const variantBorderHoverGroup = mergeConfigs(variantBorder, borderHoverGroup);

export const variantBorderExpanded = { ...borderExpanded };

export const variantOutlinedHoverless = { ...ringHoverless };
