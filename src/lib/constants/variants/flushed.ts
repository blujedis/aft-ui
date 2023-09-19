import { mergeConfigs } from '$lib/theme';

export const borderFlushed = {
	$base: '',
	default: 'border-frame-200 dark:border-frame-300',
	dark: 'border-frame-900',
	primary: 'border-primary-400',
	secondary: 'border-secondary-400',
	tertiary: 'border-tertiary-400',
	danger: 'border-danger-400',
	warning: 'border-warning-400',
	success: 'border-success-400',  
	info: 'border-info-400'
};

export const borderflushedGroupHover = {
	$base: '',
	default: 'group-hover:border-frame-300 dark:group-hover:border-frame-400',
	dark: 'group-hover:border-frame-500 dark:group-hover:border-frame-900',
	primary: 'group-hover:border-primary-600',
	secondary: 'group-hover:border-secondary-600',
	tertiary: 'group-hover:border-tertiary-600',
	danger: 'group-hover:border-danger-600',
	warning: 'group-hover:border-warning-600',
	success: 'group-hover:border-success-600',
	info: 'group-hover:border-info-600'
};

export const variantFlushed = mergeConfigs(borderFlushed, {});

export const variantFlushedHover = mergeConfigs(variantFlushed, borderflushedGroupHover);
