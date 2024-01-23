import { placeholder } from '../../constants/statez';
import { variantItemChecked, variantItemCheckedFilled, variantOutlinedHoverless, variantItemCheckedGhost } from '../../constants/variants';
import { mergeConfigs } from '../../theme';
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
