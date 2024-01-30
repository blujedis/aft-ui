import { mergeConfigs } from '../../theme/utils';
import { filledBg, filledBgAriaExpanded, filledText, filledTextAriaExpanded } from '../../constants/states';
import { variantTextExpanded, variantItemExpanded } from '../../constants/variants';
// export const accordionButton = {
// 	flushed: { ...variantTextExpanded },
// 	filled: { ...variantItemExpanded },
// 	outlined: { ...variantTextExpanded }
// };
export const accordionButton = {
    flushed: mergeConfigs(filledTextAriaExpanded, {}),
    filled: filledBgAriaExpanded,
    outlined: mergeConfigs({}, {})
};
