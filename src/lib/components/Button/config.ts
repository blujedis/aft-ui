import { mergeConfigs } from '$lib/theme';
import { variantFilled, variantGhost, variantOutlined, variantText } from '../base';

const baseVariant = mergeConfigs(variantFilled, {
	light: 'bg-frame-100 hover:bg-frame-200'
});

export const button = {
	default: {
		...baseVariant
	},
	filled: {
		...baseVariant
	},
	outlined: {
		...variantOutlined
	},
	text: {
		...variantText
	},
	ghost: {
		...variantGhost
	}
};
