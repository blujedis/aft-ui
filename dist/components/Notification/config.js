import { placeholder } from '../../theme';
export const notification = {
	default: {
		$base: 'border-r-0 border-y-0',
		white: 'border-white',
		default: 'border-default-200',
		primary: 'border-primary-500',
		secondary: 'border-secondary-500',
		tertiary: 'border-tertiary-500',
		danger: 'border-danger-500',
		warning: 'border-warning-500',
		success: 'border-success-500',
		info: 'border-info-500'
	}
};
export const notificationIcon = {
	default: {
		$base: 'text-inherit',
		white: 'text-white',
		default: 'text-default-600',
		primary: 'text-primary-600',
		secondary: 'text-secondary-600',
		tertiary: 'text-tertiary-600',
		danger: 'text-danger-600',
		warning: 'text-warning-600',
		success: 'text-success-600',
		info: 'text-info-600'
	}
};
export const notificationTitle = {
	default: { ...placeholder, $base: 'font-bold' }
};
