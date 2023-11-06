import { variantFilled, variantGhost, variantOutlined, variantFlushed } from '$lib/constants/variants';

export const selectListButton = {
  flushed: { ...variantFlushed },
  filled: { ...variantFilled },
  outlined: { ...variantOutlined },
  ghost: { ...variantGhost }
};