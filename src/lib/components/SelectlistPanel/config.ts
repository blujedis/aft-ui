import { placeholder } from '../../constants/placeholder';
import { bg } from '../../constants/base';

const baseVariant = {
	...placeholder,
	$base: 'bg-white text-inherit ring-1 ring-black ring-opacity-10',
	dark: [bg.dark, 'text-white'].join(' ')
};

export const selectListPanel = {
	default: { ...baseVariant },
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant },
	flushed: { ...baseVariant }
};
