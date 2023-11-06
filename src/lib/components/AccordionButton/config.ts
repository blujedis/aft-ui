import { variantTextExpanded, variantItemExpanded } from '$lib/constants/variants';

export const accordionButton = {
  flushed: { ...variantTextExpanded },
  filled:  { ...variantItemExpanded },
  outlined: {...variantTextExpanded }
};