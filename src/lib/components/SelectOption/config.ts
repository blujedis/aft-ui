import { text, border, borderHover } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const baseVariant = mergeConfigs(text, border, borderHover, {
	$base: ''
});

export const selectOption = {
	outlined: {
		...baseVariant
	}
};
