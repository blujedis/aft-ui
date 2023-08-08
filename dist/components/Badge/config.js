import { variantFilled, variantGlass, variantOutlined } from '../../constants';
import { mergeConfigs } from '../../theme';
const baseVariant = mergeConfigs(variantFilled, {
    $base: 'font-medium'
});
export const badge = {
    filled: { ...baseVariant },
    outlined: mergeConfigs(variantOutlined, {
        $base: 'font-medium'
    }),
    glass: mergeConfigs(variantGlass, {
        $base: 'font-medium'
    })
};
