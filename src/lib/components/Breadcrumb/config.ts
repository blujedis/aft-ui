import { filledTextSoft, placeholder, solid, solidGlass, text } from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const breadcrumbNav = {
	text: { ...placeholder },
	filled: mergeConfigs(solid, filledTextSoft, {
		light: 'text-frame-200',
		dark: 'text-frame-400'
	}),
	glass: mergeConfigs(solidGlass, text, {})
};
