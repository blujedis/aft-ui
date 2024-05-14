import { isEmpty, isEqual, isGreaterThan, isGreaterThanOrEqual, isLessThan, isLessThanOrEqual, isNotEqual, isNotEmpty, isLike } from '../../utils/is';
export const gridDefaultFilters = [
    { label: 'Like', value: 'like', handler: isLike },
    { label: 'Equal', value: '=', handler: isEqual },
    { label: 'Not Equal', value: '!=', handler: isNotEqual },
    { label: 'Greater than', value: '>', handler: isGreaterThan },
    { label: 'Greater than or equal', value: '>=', handler: isGreaterThanOrEqual },
    { label: 'Less than', value: '<', handler: isLessThan },
    { label: 'Less than or equal', value: '<=', handler: isLessThanOrEqual },
    { label: 'Empty', value: 'empty', handler: (value, _query) => isEmpty(value) },
    { label: 'Not Empty', value: '!empty', handler: (value, _query) => isNotEmpty(value) }
];
export function filterRows(criteria = [], rows = [], columns = []) {
    const vals = criteria.map((c) => c.query).filter((v) => !!v);
    if (!vals.length)
        return [...rows];
    const ands = criteria.filter((c) => c.join === 'and' || typeof c.join === 'undefined');
    const ors = criteria.filter((c) => c.join === 'or');
    const result = rows.filter((r) => {
        let hasOrs = false;
        let hasAnds = false;
        if (ands.length)
            hasAnds = ands.every((c) => {
                const col = columns.find((v) => v.accessor === c.accessor);
                const handler = c.handler || ((...args) => true);
                return handler(col.transform(c.query), r[c.accessor]);
            });
        if (ors.length)
            hasOrs = ors.some((c) => {
                const col = columns.find((v) => v.accessor === c.accessor);
                const handler = c.handler || ((...args) => true);
                return handler(col.transform(c.query), r[c.accessor]);
            });
        return hasAnds || hasOrs;
    });
    return result;
}
