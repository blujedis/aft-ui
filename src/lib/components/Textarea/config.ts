import { variantFilledHover, variantTextHover, variantGhostHover, variantOutlinedHover } from '$lib/constants/variants';

export const textarea = {
  text: { ...variantTextHover },
  filled: { ...variantFilledHover },
  outlined: { ...variantOutlinedHover },
  ghost: { ...variantGhostHover }
};