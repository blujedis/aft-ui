import { placeholder } from '../placeholder';

export const breadcrumbNav = {
	default: { ...placeholder },
	unfilled: { ...placeholder },
	filled: {
		$base: 'text-white',
		dark: 'bg-white border-white',
		light: 'text-frame-300 bg-frame-100',
		primary: 'bg-primary-500',
		secondary: 'bg-secondary-500',
		tertiary: 'bg-tertiary-500',
		danger: 'bg-danger-500',
		warning: 'bg-warning-500',
		success: 'bg-success-500',
		info: 'bg-info-500'
	}
};
