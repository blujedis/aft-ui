import { mergeConfigs } from '$lib/theme';
import {} from '../options';

// textAriaCurrent, textAriaSelected
const baseVariant = mergeConfigs(
	{},
	{
		$base:
			'hover:bg-frame-100/70 dark:hover:bg-frame-800 aria-selected:font-medium aria-current:font-medium'
	}
);

export const selectListOption = {
	filled: { ...baseVariant },
	outlined: { ...baseVariant },
	text: { ...baseVariant },
	ghost: { ...baseVariant },
	flushed: { ...baseVariant }
};
