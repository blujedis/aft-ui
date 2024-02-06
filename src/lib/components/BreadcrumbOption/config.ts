import { mergeConfigs } from '$lib/theme';
import { placeholder } from '$lib/constants';

export const breadcrumbOption = {
	text: { ...placeholder },
	filled: { ...placeholder },
	soft: {...placeholder }
	// text: {
	// 	...variantTextHover
	// },
	// filled: mergeConfigs(variantTextHover, {}),
	// ghost: { ...placeholder }
};
