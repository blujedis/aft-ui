import { placeholder } from '../../constants/placeholder';
import { bgGroupAriaChecked } from '../options';

export const switchBackdrop = {
	filled: {
		...placeholder
	}
};

export const switchFill = {
	filled: {
		...bgGroupAriaChecked,
		$base: 'bg-frame-100'
	}
};

export const switchHandle = {
	filled: {
		...placeholder,
		$base: 'bg-white border-frame-300 dark:border-frame-600'
	}
};
