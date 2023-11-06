import { placeholder } from '$lib/constants';


// bgAriaChecked, textFilled
const baseVariant =
{
	$base: 'border border-transparent'
};

export const buttonGroupItem = {
	filled: {
		...baseVariant
	},

	// bgAriaChecked
	outlined:
	{
		$base: 'bg-transparent aria-checked:text-white hover:z-10'
		// light:
		// 	'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]'
	},

	text: {
		...placeholder,
		$base: 'no-underline aria-checked:underline',
		dark: 'text-inherit'
	},

	// bgAriaChecked
	ghost:
	{
		$base: 'aria-checked:text-white'
		// light:
		// 	'aria-checked:text-[color:var(--text-dark)] dark:aria-checked:text-[color:var(--text-dark)]'
	}

};
