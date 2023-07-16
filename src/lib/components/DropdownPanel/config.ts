import { placeholder } from '../placeholder';

const baseVariant = {
	...placeholder,
	$base: 'bg-white text-inherit border border-transparent ring-1 ring-black ring-opacity-5'
};

export const dropdownPanel = {
	default: { ...baseVariant },
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant }
};
