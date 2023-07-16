import { placeholder } from '../placeholder';

export const switchBackdrop = {
	default: {
		...placeholder,
		//	$base: 'bg-white'
	}
};

export const switchFill = {
	default: {
		$base: 'bg-default-300',
		white: 'bg-white group-aria-checked:bg-gray-200',
		default: 'bg-default-300 group-aria-checked:bg-default-400',
		primary: 'group-aria-checked:bg-primary-500',
		secondary: 'group-aria-checked:bg-secondary-500',
		tertiary: 'group-aria-checked:bg-tertiary-500',
		danger: 'group-aria-checked:bg-danger-500',
		warning: 'group-aria-checked:bg-warning-500',
		success: 'group-aria-checked:bg-success-500',
		info: 'group-aria-checked:bg-info-500'
	}
};

export const switchHandle = {
	default: {
		...placeholder,
		$base: 'bg-white border-default-300',
		white: 'border-default-200',
	}
};
