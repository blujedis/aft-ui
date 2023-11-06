import { fill, stroke, placeholder } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

const baseTrackVariant = {
	...placeholder,
	$base: 'stroke-frame-100 dark:stroke-frame-600',
};

const baseValueVariant = mergeConfigs(stroke, {
	dark: 'dark:stroke-frame-700'
});

const baseTextVariant = mergeConfigs(fill, {
	$base: 'text-[.85em]'
});

export const progressCircleTrack = {
	filled: { ...baseTrackVariant }
};

export const progressCircleValue = {
	filled: { ...baseValueVariant }
};

export const progressCircleText = {
	filled: { ...baseTextVariant }
};
