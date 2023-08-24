import { mergeConfigs } from '$lib/theme';
import { placeholder } from '../placeholder';

const textFilled = {
	$base: '',
	default: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	dark: 'text-[color:var(--text-light)]',
	primary: 'text-white',
	secondary: 'text-white',
	tertiary: 'text-white',
	danger: 'text-white',
	warning: 'text-white',
	success: 'text-white',
	info: 'text-white'
};

const bgFilled = {
	$base: '',
	default: 'bg-frame-100 dark:bg-frame-500',
	dark: 'bg-frame-500 dark:bg-frame-800',
	primary: 'bg-primary-500 ',
	secondary: 'bg-secondary-500',
	tertiary: 'bg-tertiary-500',
	danger: 'bg-danger-500',
	warning: 'bg-warning-500',
	success: 'bg-success-500',
	info: 'bg-info-500'
};

const bgFilledHover = {
	$base: '',
	default: 'hover:bg-frame-200/70 dark:hover:bg-frame-600',
	dark: 'hover:bg-frame-600 dark:hover:bg-frame-900',
	primary: 'hover:bg-primary-600',
	secondary: 'hover:bg-secondary-600',
	tertiary: 'hover:bg-tertiary-600',
	danger: 'hover:bg-danger-600',
	warning: 'hover:bg-warning-600',
	success: 'hover:bg-success-600',
	info: 'hover:bg-info-600'
};

export const variantActive = {
	...placeholder,
	$base: 'bg-frame-50 dark: dark:bg-frame-700/50',
};

export const variantFilled = mergeConfigs(textFilled, bgFilled);

export const variantFilledHover = mergeConfigs(variantFilled, bgFilledHover);
