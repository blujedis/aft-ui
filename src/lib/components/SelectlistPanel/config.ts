import { panel } from '$lib/constants';

const baseVariant = {
	...panel
};

export const selectListPanel = {
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant },
	flushed: { ...baseVariant }
};
