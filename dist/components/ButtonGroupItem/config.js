import { placeholder } from '../../constants/options';
import { variantItemChecked, variantItemCheckedFilled, variantOutlinedHoverless, variantItemCheckedGhost } from '../../constants/variants';
import { mergeConfigs } from '../../theme';
export const buttonGroupItem = {
    text: {
        ...placeholder
    },
    filled: {
        ...variantItemCheckedFilled
    },
    outlined: mergeConfigs(variantOutlinedHoverless, variantItemChecked),
    ghost: {
        ...variantItemCheckedGhost
    },
    soft: {
        ...placeholder
    }
};
