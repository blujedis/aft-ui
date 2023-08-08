import { tile } from '../../constants';
import { mergeConfigs } from '../../theme';
const baseVariant = mergeConfigs(tile, {
    $base: 'border-[3px] border-dashed relative'
});
export const empty = {
    outlined: {
        ...baseVariant
    }
};
