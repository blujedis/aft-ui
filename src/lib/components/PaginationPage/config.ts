import {
	textHover,
	bgAriaSelected,
	borderAriaSelected,
	textAriaSelected,
	solidGlassHover,
	bgAriaGlassSelected
} from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const baseVariant = mergeConfigs(solidGlassHover, bgAriaSelected, {
	$base:
		'ring-1 ring-inset ring-black ring-opacity-10 dark:ring-opacity-40 text-frame-500 aria-selected:text-white',
	white: 'aria-selected:text-[color:var(--text-dark)]',
	light: 'aria-selected:text-[color:var(--text-dark)]'
});

export const paginationPage = {
	filled: {
		...baseVariant
	},
	flushed: mergeConfigs(textHover, textAriaSelected, borderAriaSelected, {
		$base:
			'inline-flex items-center border-t-2 font-medium border-x-0 border-b-0 dark:border-black dark:border-opacity-40 aria-selected:border-opacity-100',
		dark: 'aria-selected:border-frame-600'
	}),

	glass: mergeConfigs(bgAriaGlassSelected, solidGlassHover, {
		$base:
			'ring-1 ring-inset ring-black ring-opacity-10 dark:ring-opacity-40 text-frame-500 aria-selected:text-white'
	})
};
