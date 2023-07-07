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
