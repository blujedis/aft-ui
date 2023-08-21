import { text, border, solid } from '../../constants';
import { mergeConfigs } from '../../theme';
export const paginationDetail = {
    filled: {
        ...solid,
        $base: 'text-inherit'
    },
    outlined: mergeConfigs(border, text, {
        $base: 'text-inherit'
    })
};
