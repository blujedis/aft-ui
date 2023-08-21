import { searchArray, sortArray } from '../../utils';
const defaultBeforeRemove = (_item) => true;
export const gridDefaults = {
    autocols: true,
    divided: true,
    size: 'md',
    sticky: true,
    theme: 'default',
    variant: 'outlined',
    filter: searchArray,
    sorter: sortArray,
    onBeforeRemove: defaultBeforeRemove
};
