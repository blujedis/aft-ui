import { mergeConfigs } from '$lib/theme';
import { textAriaSelected, textAriaCurrent } from '../options';
const baseVariant = mergeConfigs(textAriaSelected, textAriaCurrent);

export const menuOption = {
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant }
};
