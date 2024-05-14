import {
	isEmpty,
	isEqual,
	isGreaterThan,
	isGreaterThanOrEqual,
	isLessThan,
	isLessThanOrEqual,
	isNotEqual,
	isNotEmpty,
	isLike
} from '$lib/utils/is';
import type { DataGridColumnConfig } from '.';

export type DataGridFilterListHandler = (value: any, query: any) => boolean;

export type DataGridFilterCriteria<D> = {
	query: string;
	accessor: keyof D;
	condition: any;
	join?: 'and' | 'or';
	handler?: DataGridFilterListHandler;
};

export type DataGridFilterListItem = {
	label: string;
	value: any;
	handler: DataGridFilterListHandler;
};

export const gridDefaultFilters = [
	{ label: 'Like', value: 'like', handler: isLike },
	{ label: 'Equal', value: '=', handler: isEqual },
	{ label: 'Not Equal', value: '!=', handler: isNotEqual },
	{ label: 'Greater than', value: '>', handler: isGreaterThan },
	{ label: 'Greater than or equal', value: '>=', handler: isGreaterThanOrEqual },
	{ label: 'Less than', value: '<', handler: isLessThan },
	{ label: 'Less than or equal', value: '<=', handler: isLessThanOrEqual },
	{ label: 'Empty', value: 'empty', handler: (value: any, _query: any) => isEmpty(value) },
	{ label: 'Not Empty', value: '!empty', handler: (value: any, _query: any) => isNotEmpty(value) }
] as DataGridFilterListItem[];

export function filterRows<D extends Record<string, unknown>, C extends DataGridColumnConfig<D>>(
	criteria = [] as DataGridFilterCriteria<D>[],
	rows = [] as D[],
	columns = [] as C[]
) {
	const vals = criteria.map((c) => c.query).filter((v) => !!v);
	if (!vals.length) return [...rows];

	const ands = criteria.filter((c) => c.join === 'and' || typeof c.join === 'undefined');
	const ors = criteria.filter((c) => c.join === 'or');

	const result = rows.filter((r) => {
		let hasOrs = false;
		let hasAnds = false;
		if (ands.length)
			hasAnds = ands.every((c) => {
				const col = columns.find((v) => v.accessor === c.accessor) as C;
				const handler = c.handler || ((...args: any[]) => true);
				return handler(
					(col as Required<DataGridColumnConfig<D>>).transform(c.query),
					r[c.accessor]
				);
			});
		if (ors.length)
			hasOrs = ors.some((c) => {
				const col = columns.find((v) => v.accessor === c.accessor) as C;
				const handler = c.handler || ((...args: any[]) => true);
				return handler(
					(col as Required<DataGridColumnConfig<D>>).transform(c.query),
					r[c.accessor]
				);
			});

		return hasAnds || hasOrs;
	});

	return result;
}
