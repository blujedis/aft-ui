import { sortArray } from '../../utils';
import { filterRows, gridDefaultFilters } from './filter';
const defaultBeforeRemove = (_item) => true;
export const gridDefaults = {
    autocols: true,
    divided: false,
    filters: [...gridDefaultFilters],
    rowkey: 'id',
    size: 'md',
    theme: 'frame',
    filter: filterRows,
    sorter: sortArray,
    onBeforeRemove: defaultBeforeRemove
};
