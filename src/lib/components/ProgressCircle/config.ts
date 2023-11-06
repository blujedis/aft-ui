import { fill, stroke, placeholder } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const progressCircleTrack = {
	filled: {
		...placeholder,
		$base: 'stroke-frame-100 dark:stroke-frame-600',
	}
};

export const progressCircleValue = {
	filled: mergeConfigs(stroke, { dark: 'dark:stroke-frame-700' })
};

export const progressCircleText = {
	filled: mergeConfigs(fill, { $base: 'text-[.85em]' })
};
