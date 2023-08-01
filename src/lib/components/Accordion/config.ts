import { placeholder } from '../../constants/placeholder';

const baseVariant = {
	$base: '',
	dark: '',
	light: '',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: '',
	warning: '',
	success: '',
	info: ''
};

export const accordion = {
	default: { ...baseVariant },
	outlined: { ...baseVariant },
	flushed: { ...placeholder },
	pills: {
		$base: '',
		dark: '',
		light: '',
		primary: '',
		secondary: '',
		tertiary: '',
		danger: '',
		warning: '',
		success: '',
		info: ''
	}
};
