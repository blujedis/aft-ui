import { bgAriaChecked, filledText, placeholder } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const baseVariant = mergeConfigs(filledText, bgAriaChecked, {
	$base: 'border border-transparent'
});

export const buttonGroupItem = {
	filled: {
		...baseVariant
	},
	outlined: mergeConfigs(bgAriaChecked, {
		$base: 'bg-transparent aria-checked:text-white hover:z-10',
		white:
			'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]',
		light:
			'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]'
	}),
	text: {
		...placeholder,
		$base: 'no-underline aria-checked:underline',
		white: 'text-inherit',
		light: 'text-inherit',
		dark: 'text-inherit'
	},
	ghost: mergeConfigs(bgAriaChecked, {
		$base: 'aria-checked:text-white',
		white:
			'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]',
		light:
			'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]'
	}),
	glass: {
		...placeholder // TODO: add glass styles.
	}
};
