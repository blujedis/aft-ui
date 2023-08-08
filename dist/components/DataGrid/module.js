import { searchArray, sortArray } from '../../utils';
const defaultBeforeRemove = (_item) => true;
export const gridDefaults = {
    autocols: true,
    divided: true,
    size: 'md',
    sticky: true,
    theme: 'light',
    variant: 'outlined',
    filter: searchArray,
    sorter: sortArray,
    onBeforeRemove: defaultBeforeRemove
};
