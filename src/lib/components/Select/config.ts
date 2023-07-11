import { variantOutlined, variantFilled, variantFlushed } from '../Button/config';

const defaultSelect = {
	...variantOutlined
	// $base: 'text-inherit border ring-transparent ring-1',
	// white: 'text-white ring-white hover:ring-default-100',
	// default: 'text-default-600 ring-default-200 hover:ring-default-300',
	// primary: 'text-primary-600 ring-primary-500 hover:ring-primary-600',
	// secondary: 'text-secondary-600 ring-secondary-500 hover:ring-secondary-600',
	// tertiary: 'text-tertiary-600 ring-tertiary-500 hover:ring-tertiary-600',
	// danger: 'text-danger-600 ring-danger-500 hover:ring-danger-600',
	// warning: 'text-warning-600 ring-warning-500 hover:ring-warning-600',
	// success: 'text-success-600 ring-success-500 hover:ring-success-600',
	// info: 'text-info-600 ring-info-500 hover:ring-info-600'
};

export const select = {
	default: {
		...defaultSelect
	},
	outlined: {
		...defaultSelect
	},
	filled: {
		...variantFilled
		// $base: 'text-inherit border border-transparent',
		// white: 'text-white bg-white hover:bg-default-200 ring-white',
		// default: 'text-default-600 bg-default-100 hover:bg-default-200 ring-default-100',
		// primary: 'text-primary-600 bg-primary-50 hover:bg-primary-100 ring-primary-50',
		// secondary: 'text-secondary-600 bg-secondary-50 hover:bg-secondary-100 ring-primary-50',
		// tertiary: 'text-tertiary-600 bg-tertiary-50 hover:bg-tertiary-100 ring-tertiary-50',
		// danger: 'text-danger-600 bg-danger-50 hover:bg-danger-100 ring-danger-50',
		// warning: 'text-warning-600 bg-warning-50 hover:bg-warning-100 ring-warning-50',
		// success: 'text-success-600 bg-success-50 hover:bg-success-100 ring-success-50',
		// info: 'text-info-600 bg-info-50 hover:bg-info-200 ring-info-50'
	},
	flushed: {
		...variantFlushed
		// $base:
		// 	'text-inherit border border-l-0 border-r-0 border-t-0 focus:border-b-2 focus:outline-none focus:!ring-0 focus-visible:!ring-0',
		// white: 'text-white border-white focus:border-default-200',
		// default: 'text-default-600 border-default-200 focus:border-default-500',
		// primary: 'text-primary-600 border-primary-500 focus:border-primary-600',
		// secondary: 'text-secondary-600 border-secondary-500 focus:border-secondary-600',
		// tertiary: 'text-tertiary-600 border-tertiary-500 focus:border-tertiary-600',
		// danger: 'text-danger-600 border-danger-500 focus:border-danger-600',
		// warning: 'text-warning-600 border-warning-500 focus:border-warning-600',
		// success: 'text-success-600 border-success-500 focus:border-success-600',
		// info: 'text-info-600 border-info-500 focus:border-info-600'
	}
};
