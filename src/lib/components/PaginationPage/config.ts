import {
	textHover,
} from '$lib/constants';
import { mergeConfigs } from '$lib/theme';


// solidGlassHover, bgAriaSelected
const baseVariant = mergeConfigs({}, {
	$base: 'text-frame-500 aria-selected:text-white',
	default: 'aria-selected:text-[color:var(--text-dark)]'
});

export const paginationPage = {
	filled: {
		...baseVariant
	},
	// textAriaSelected, borderAriaSelected
	flushed: mergeConfigs(textHover, {
		$base: 'dark:border-black dark:border-opacity-40 aria-selected:border-opacity-100',
		dark: 'aria-selected:border-frame-600'
	}),

	// bgAriaGlassSelected, solidGlassHover,
	glass: mergeConfigs({}, {
		$base: 'text-frame-500 aria-selected:text-white'
	})
};
