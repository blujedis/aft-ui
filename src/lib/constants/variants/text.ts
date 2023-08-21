import { mergeConfigs } from '$lib/theme';

export const text = {
	$base: '',
	default: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	dark: 'text-[color:var(--text-dark)] dark:text-[color:var(--text-light)]',
	primary: 'text-primary-500',
	secondary: 'text-secondary-500',
	tertiary: 'text-tertiary-500',
	danger: 'text-danger-500',
	warning: 'text-warning-500',
	success: 'text-success-500',
	info: 'text-info-500'
};

export const textHover = {
	$base: '',
	default:
		'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
	dark: 'hover:text-[color:var(--text-dark-hover)] dark:hover:text-[color:var(--text-light-hover)]',
	primary: 'hover:text-primary-700',
	secondary: 'hover:text-secondary-700',
	tertiary: 'hover:text-tertiary-700',
	danger: 'hover:text-danger-700',
	warning: 'hover:text-warning-700',
	success: 'hover:text-success-700',
	info: 'hover:text-info-700'
};

export const textExpanded = {
	$base: '',
	default: '',
  dark: '',
  primary: 'aria-expanded:text-primary-500 dark:aria-expanded:text-primary-500',
  secondary: 'aria-expanded:text-secondary-500 dark:aria-expanded:text-secondary-500',
  tertiary: 'aria-expanded:text-tertiary-500 dark:aria-expanded:text-tertiary-500',
  danger: 'aria-expanded:text-danger-500 dark:aria-expanded:text-danger-500',
  warning: 'aria-expanded:text-warning-500 dark:aria-expanded:text-warning-500',
  success: 'aria-expanded:text-success-500 dark:aria-expanded:text-success-500',
  info: 'aria-expanded:text-info-500 dark:aria-expanded:text-info-500'
}

export const variantText = { ...text };

export const variantTextHover = mergeConfigs(variantText, textHover);

export const variantTextExpanded = { ...textExpanded };

