import { placeholder } from '$lib/theme';

const baseVariant = {
	...placeholder
};

export const accordionOption = {
	default: { ...baseVariant },
	outlined: { ...baseVariant },
	flushed: { ...placeholder },
	pills: { ...placeholder }
};
