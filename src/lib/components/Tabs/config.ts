import { placeholder } from '$lib/constants/options';

export const tabs = {
	soft: {
		...placeholder
	},
	flushed: {
		...placeholder,
		$base:
			'border-t-0 border-x-0 border-b border-frame-200 dark:border-black dark:border-opacity-40'
	},
	filled: { ...placeholder },
	outlined: { ...placeholder },
	text: {
		...placeholder,
		$base:
			'border-t-0 border-x-0 border-b border-frame-200 dark:border-black dark:border-opacity-40'
	}
};
