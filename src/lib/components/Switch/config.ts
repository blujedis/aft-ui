import { placeholder } from '../placeholder';

export const switchBackdrop = {
	default: {
		...placeholder
		//	$base: 'bg-white'
	}
};

export const switchFill = {
	default: {
		$base: 'bg-frame-300',
		dark: 'bg-white group-aria-checked:bg-gray-200',
		light: 'bg-frame-300 group-aria-checked:bg-frame-400',
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
		$base: 'bg-white border-frame-300',
		dark: 'border-frame-200'
	}
};
