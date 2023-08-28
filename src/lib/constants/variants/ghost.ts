import { mergeConfigs } from '$lib/theme';

const textGhost = {
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

const textGhostHover = {
	$base: '',
	default: '',
	dark: '',
	primary: 'hover:text-primary-700 dark:hover:text-primary-50',
	secondary: 'hover:text-secondary-700 dark:hover:text-secondary-50',
	tertiary: 'hover:text-tertiary-700 dark:hover:text-tertiary-50',
	danger: 'hover:text-danger-700 dark:hover:text-danger-50',
	warning: 'hover:text-warning-700 dark:hover:text-warning-50',
	success: 'hover:text-success-700 dark:hover:text-success-50',
	info: 'hover:text-info-700 dark:hover:text-info-50'
};

const bgGhost = {
	$base: 'bg-transparent',
	default: 'bg-frame-100 dark:bg-frame-500/50',
	dark: 'bg-frame-600/50 dark:bg-frame-600/10',
	primary: 'bg-primary-100 dark:bg-primary-500/50',
	secondary: 'bg-secondary-100 dark:bg-secondary-500/50',
	tertiary: 'bg-tertiary-100 dark:bg-tertiary-500/50',
	danger: 'bg-danger-100 dark:bg-danger-500/50',
	warning: 'bg-warning-100 dark:bg-warning-500/50',
	success: 'bg-success-100 dark:bg-success-500/50',
	info: 'bg-info-100 dark:bg-info-500/50'
};

const bgGhostHover = {
	$base: 'bg-transparent',
	default: 'hover:bg-frame-100 dark:hover:bg-frame-500/50',
	dark: 'hover:bg-frame-600/50 dark:hover:bg-frame-900/40',
	primary: 'hover:bg-primary-100 dark:hover:bg-primary-500/50',
	secondary: 'hover:bg-secondary-100 dark:hover:bg-secondary-500/50',
	tertiary: 'hover:bg-tertiary-100 dark:hover:bg-tertiary-500/50',
	danger: 'hover:bg-danger-100 dark:hover:bg-danger-500/50',
	warning: 'hover:bg-warning-100 dark:hover:bg-warning-500/50',
	success: 'hover:bg-success-100 dark:hover:bg-success-500/50',
	info: 'hover:bg-info-100 dark:hover:bg-info-500/50'
};

export const variantGhost = mergeConfigs(textGhost, bgGhost);

export const variantGhostHover = mergeConfigs(textGhost, textGhostHover, bgGhostHover);
