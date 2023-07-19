import { placeholder } from '../placeholder';

const baseVariant = {
	...placeholder,
	$base: 'bg-white text-inherit ring-1 ring-black ring-opacity-10'
};

export const multiselectPanel = {
	default: { ...baseVariant },
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant }
};
