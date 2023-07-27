import { mergeConfigs } from '../../theme';
import { variantFilled, variantOutlined } from '../Button/config';
const baseVariant = mergeConfigs(variantFilled, {
    $base: 'text-inherit border border-transparent bg-frame-100 text-white font-medium'
});
export const tile = {
    default: { ...baseVariant },
    filled: { ...baseVariant },
    outline: mergeConfigs(variantOutlined, {
        $base: 'hover:text-inherit ring-1 font-medium'
    })
};
