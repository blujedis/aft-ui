import { mergeConfigs } from '$lib/theme';
import { placeholder } from '$lib/constants';

export const notification = {
	filled: mergeConfigs(placeholder, {
		$base: 'border-r-0 border-y-0 bg-white dark:bg-frame-700 dark:text-white'
	})
};

export const notificationIcon = {
	filled: {
		...placeholder
	}
};

export const notificationTitle = {
	filled: { ...placeholder, $base: 'font-bold' }
};
