import { placeholder } from '../../constants/states';

export const tabs = {
	flushed: {
		...placeholder,
		$base:
			'border-t-0 border-x-0 border-b border-frame-200 dark:border-black dark:border-opacity-40'
	},
	filled: { ...placeholder },
	grouped: { ...placeholder },
	labeled: {
		...placeholder,
		$base:
			'border-t-0 border-x-0 border-b border-frame-200 dark:border-black dark:border-opacity-40'
	},
	glass: {
		...placeholder
	}
};
