import { variantFilled, variantFlushed, variantFlushedHover, variantFilledHover, variantGhost, variantGhostHover, variantGlass, variantGlassHover, variantOutlined, variantOutlinedHover, variantText, variantTextHover, variantPanel } from '../constants/base';

export const globals = {
  text: { ...variantText },
  textHover: { ...variantTextHover },
  filled: { ...variantFilled },
  filledHover: { ...variantFilledHover },
  outlined: { ...variantOutlined },
  outlinedHover: { ...variantOutlinedHover },
  ghost: { ...variantGhost },
  ghostHover: { ...variantGhostHover },
  glass: { ...variantGlass },
  glassHover: { ...variantGlassHover },
  flushed: { ...variantFlushed },
  flushedHover: { ...variantFlushedHover },
  panel: { ...variantPanel }
};