import { placeholder } from '../../constants/placeholder';
import {} from '../options';

export const switchBackdrop = {
	filled: {
		...placeholder
	}
};

// bgGroupAriaChecked
export const switchFill = {
	filled: {
		$base: 'bg-frame-100'
	}
};

export const switchHandle = {
	filled: {
		...placeholder,
		$base: 'bg-white border-frame-300 dark:border-frame-600'
	}
};
