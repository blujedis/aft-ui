import { searchArray, sortArray } from '../../utils';
const defaultBeforeRemove = (_item) => true;
export const gridDefaults = {
    autocols: true,
    divided: false,
    size: 'md',
    theme: 'frame',
    filter: searchArray,
    sorter: sortArray,
    onBeforeRemove: defaultBeforeRemove
};
