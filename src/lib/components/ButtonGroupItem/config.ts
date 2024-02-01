import { placeholder } from '$lib/constants/options';
import {
	variantItemChecked,
	variantItemCheckedFilled,
	variantOutlinedHoverless,
	variantItemCheckedGhost
} from '$lib/constants/variants';
import { mergeConfigs } from '$lib/theme';

export const buttonGroupItem = {
	filled: {
		...variantItemCheckedFilled
	},
	outlined: mergeConfigs(variantOutlinedHoverless, variantItemChecked),
	ghost: {
		...variantItemCheckedGhost
	},
	text: {
		...placeholder
	}
};
