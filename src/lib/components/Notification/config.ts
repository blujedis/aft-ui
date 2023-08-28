// import { text } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';
import { placeholder } from '../../constants/placeholder';

const border = { ...placeholder };

export const notification = {
	filled: mergeConfigs(border, {
		$base: 'border-r-0 border-y-0 bg-white dark:bg-frame-700 dark:text-white'
	})
};

export const notificationIcon = {
	filled: {
		// ...text,
		$base: ''
	}
};

export const notificationTitle = {
	filled: { ...placeholder, $base: 'font-bold' }
};
