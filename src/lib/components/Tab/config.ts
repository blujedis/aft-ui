import {
	textHover
} from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

// borderAriaSelected
const baseVariant = mergeConfigs(textHover, {
	$base: 'border-transparent border-b-2 border-x-0 border-t-0 rounded-br-none rounded-bl-none'
});

// bgAriaSelected
const filledVariant = mergeConfigs(textHover, {
	light: 'aria-selected:text-[color:var(--text-dark)]',
	$base: 'aria-selected:text-white'
});

// bgAriaSelected, solidGlassHover
const groupedVariant = mergeConfigs({}, {
	$base:
		'border border-frame-200 dark:border-black dark:border-opacity-40 aria-selected:text-white',
	light: 'aria-selected:text-[color:var(--text-dark)]'
});

// textAriaSelected
const labeledVariant = mergeConfigs({}, {
	$base:
		'-mb-px  border border-transparent aria-selected:border-frame-200 dark:aria-selected:border-black dark:border-opacity-40 aria-selected:border-b-[color:var(--bg-light)] dark:aria-selected:border-b-[color:var(--bg-dark)] aria-selected:font-medium',
	light: 'dark:text-[color:var(--text-light)]',
	dark: 'aria-selected:text-[color:var(--text-dark)] dark:aria-selected:text-[color:var(--text-light)]'
});

export const tab = {
	flushed: {
		...baseVariant
	},
	filled: {
		...filledVariant
	},
	grouped: {
		...groupedVariant
	},
	labeled: {
		...labeledVariant
	}
};
