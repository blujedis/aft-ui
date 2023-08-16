import { textSoft, placeholder, solid, solidGlass, text } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const breadcrumbNav = {
	text: { ...placeholder },
	filled: mergeConfigs(solid, textSoft, {
		light: 'text-frame-200',
		dark: 'text-frame-400'
	}),
	glass: mergeConfigs(solidGlass, text, {})
};
