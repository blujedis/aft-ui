import { placeholder } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

// bgAriaChecked, textFilled
const baseVariant = mergeConfigs(
	{},
	{
		$base: 'border border-transparent'
	}
);

export const buttonGroupItem = {
	filled: {
		...baseVariant
	},

	// bgAriaChecked
	outlined: mergeConfigs(
		{},
		{
			$base: 'bg-transparent aria-checked:text-white hover:z-10'
			// light:
			// 	'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]'
		}
	),

	text: {
		...placeholder,
		$base: 'no-underline aria-checked:underline',
		dark: 'text-inherit'
	},

	// bgAriaChecked
	ghost: mergeConfigs(
		{},
		{
			$base: 'aria-checked:text-white'
			// light:
			// 	'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]'
		}
	)
};
