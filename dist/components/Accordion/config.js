import { placeholder } from '../../constants';
import { common } from '../options';
const bordered = [common.bordered, common.divided].join(' ');
//divide-frame-200 border border-frame-200 dark:border-black dark:border-opacity-40 dark:divide-black dark:divide-opacity-40'
const baseVariant = {
    ...placeholder,
    $base: 'divide-y border ' + bordered
};
export const accordion = {
    outlined: { ...baseVariant },
    flushed: {
        ...baseVariant,
        $base: 'rounded-none'
    },
    filled: {
        ...placeholder
    },
    glass: {
        ...placeholder
    }
};
