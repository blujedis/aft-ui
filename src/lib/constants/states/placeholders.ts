import { mergeConfigs } from '$lib/theme';

export const placeholder = {
	$base: '',
	default: '',
	dark: '',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: '',
	warning: '',
	success: '',
	info: ''
};

const placeholdersDark = {
	$base: '',
	default: 'dark:placeholder:text-frame-500',
	dark: 'dark:placeholder:text-frame-500',
	primary: 'dark:placeholder:text-primary-700',
	secondary: 'dark:placeholder:text-secondary-700',
	tertiary: 'dark:placeholder:text-tertiary-700',
	danger: 'dark:placeholder:text-danger-700',
	warning: 'dark:placeholder:text-warning-700',
	success: 'dark:placeholder:text-success-700',
	info: 'dark:placeholder:text-info-700'
};

const placeholdersDisabled = {
	$base: '',
	default: 'aria-disabled:placeholder:text-frame-200',
	dark: 'aria-disabled:placeholder:text-frame-500',
	primary: 'aria-disabled:placeholder:text-primary-300',
	secondary: 'aria-disabled:placeholder:text-secondary-300',
	tertiary: 'aria-disabled:placeholder:text-tertiary-300',
	danger: 'aria-disabled:placeholder:text-danger-300',
	warning: 'aria-disabled:placeholder:text-warning-300',
	success: 'aria-disabled:placeholder:text-success-300',
	info: 'aria-disabled:placeholder:text-info-300'
};

export const placeholders = mergeConfigs(placeholdersDark, placeholdersDisabled, {
	default: 'placeholder:text-frame-400',
	dark: 'placeholder:text-frame-400',
	primary: 'placeholder:text-primary-300',
	secondary: 'placeholder:text-secondary-300',
	tertiary: 'placeholder:text-tertiary-300',
	danger: 'placeholder:text-danger-300',
	warning: 'placeholder:text-warning-300',
	success: 'placeholder:text-success-300',
	info: 'placeholder:text-info-300'
});
