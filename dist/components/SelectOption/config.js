import { text, border, borderHover } from '../../constants';
import { mergeConfigs } from '../../theme';
const baseVariant = mergeConfigs(text, border, borderHover, {
    $base: ''
});
export const selectOption = {
    outlined: {
        ...baseVariant
    }
};
