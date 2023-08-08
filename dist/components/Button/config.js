import { variantText, variantFilledHover, variantOutlinedHover, variantGhostHover, variantGlassHover } from '../../constants';
import { mergeConfigs } from '../../theme';
export const button = {
    filled: {
        ...variantFilledHover
    },
    outlined: {
        ...variantOutlinedHover
    },
    text: {
        ...variantText
    },
    ghost: {
        ...variantGhostHover
    },
    glass: mergeConfigs(variantGlassHover, {})
};
