import { filledTextHover, text, textAriaSelectedSoft, textHover } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const defaultBreadcrumbOption = mergeConfigs(text, textHover, textAriaSelectedSoft);

export const breadcrumbOption = {
	text: {
		...defaultBreadcrumbOption
	},
	filled: mergeConfigs(textAriaSelectedSoft, filledTextHover, {
		$base: 'text-white hover:text-[color:var(--text-light)]',
		white: 'text-[color:var(--text-dark)]',
		light: 'text-[color:var(--text-dark)]'
	}),
	glass: mergeConfigs(textAriaSelectedSoft, text, textHover, {
		white: 'dark:text-[color:var(--text-dark)]'
	})
};
