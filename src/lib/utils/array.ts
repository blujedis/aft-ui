import { getProperty } from 'dot-prop';

/**
 * Inserts a new item into an array without mutating.
 *
 * @param arr the array to insert value into.
 * @param index the index at which to insert the value.
 * @param newItem the new item to be inserted.
 */
export function arrayInsert(arr: any[], index: number, newItem: any) {
	return [
		...arr.slice(0, index), // before index
		newItem,
		...arr.slice(index) // after index.
	];
}

/**
 * If undefined empty array is returned otherwise the array or value wrapped as array is.
 *
 * @param value the value to inspect as any array.
 */
export function ensureArray<T = any>(value?: null | T | T[]) {
	if (typeof value === 'undefined' || value === null || value === '') return [] as T[];
	if (Array.isArray(value)) return value as T[];
	return [value] as T[];
}

/**
 * Simple function using indexOf for SQL LIKE evaluation.
 *
 * @param query the search query.
 * @param value the value to apply search query against.
 */
export function isLike(query: string, value: any): boolean {
	return (value + '').toLowerCase().indexOf(query.toLowerCase()) > -1;
}

/**
 * Rudamentary search filter applying indexOf checking against all or specified accessor fields.
 *
 * @param query the search query.
 * @param items an array of items to apply the search to.
 * @param accessors optional accessor keys applying search to only these keys.
 */
export function searchArray<T extends Record<string, any>>(
	query: string,
	items: T[],
	...accessors: (keyof T)[]
): T[] {
	if (!accessors.length)
		return items.filter((item) => Object.entries(item).some(([_key, val]) => isLike(query, val)));
	return items.filter((item) => accessors.some((key) => isLike(query, item[key])));
}

export type SortAccessor<T> = Extract<keyof T, string> | `-${Extract<keyof T, string>}`;
export type Primer = <T>(value: any, accessor: keyof T) => any;
export type Comparator = (a: any, b: any) => number;

function defaultComparator(a: any, b: any) {
	return a == b ? 0 : a > b ? 1 : -1;
}

/**
 * Create a sort comparator function with optional primer so that values can be
 * converted to the correct type for comparison.
 *
 * @example
 * createComparator('-name', ('Bob Smith', name) => 'bob smith')
 *
 * @param accessor the property that is to be primed if required.
 * @param primer the function for priming the value.
 */
function createComparator<T>(accessor: SortAccessor<T>, primer?: Primer) {
	const isDesc = accessor.charAt(0) === '-';
	const key = isDesc ? accessor.slice(1) : accessor;
	let comparator = defaultComparator;
	if (primer) comparator = (a, b) => defaultComparator(primer(a, key), primer(b, key));
	if (isDesc)
		return [key, (a: any, b: any) => -1 * comparator(a, b)] as [
			Extract<keyof T, string>,
			Comparator
		];
	return [key, comparator] as [Extract<keyof T, string>, Comparator];
}

/**
 * Creates a Array sort function sorting by one or more properties and with optional primer for
 * casting values to correct types before comparing.
 *
 * @example
 * const sorter = createSort([], ['name', '-age'], (value, key) => value);
 *
 *
 * @param items the array of objects to be sorted.
 * @param accessors an array of accessors to be sorted against.
 * @param primer an optional primer function for formatting values before compare.
 */
export function sortArray<T extends Record<string, any>>(
	items: T[],
	accessors: SortAccessor<T>[],
	primer?: Primer
) {
	const comparators = accessors.map((a) => createComparator(a, primer));
	if (!comparators.length) return items.sort();
	const fn = (a: T, b: T) => {
		let result = 0;
		for (const tuple of comparators) {
			const [key, compare] = tuple;
			result = compare(getProperty(a, key), getProperty(b, key));
			if (result !== 0) break;
		}
		return result;
	};
	return items.sort(fn);
}
