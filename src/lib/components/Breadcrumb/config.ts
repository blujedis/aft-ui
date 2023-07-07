import { placeholder } from '$lib/theme';

export const breadcrumbNav = {
	default: { ...placeholder },
	unfilled: { ...placeholder },
	filled: {
		$base: 'text-white border-t-0 border-x-0',
		white: 'bg-white border-white',
		default: 'text-default-300 bg-default-200 border-default-300',
		primary: 'bg-primary-500 border-primary-600',
		secondary: 'bg-secondary-500 border-secondary-600',
		tertiary: 'bg-tertiary-500 border-tertiary-600',
		danger: 'bg-danger-500 border-danger-600',
		warning: 'bg-warning-500 border-warning-600',
		success: 'bg-success-500 border-success-600',
		info: 'bg-info-500 border-info-600'
	}
};
