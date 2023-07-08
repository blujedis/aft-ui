/**
 * Inserts a new item into an array without mutating.
 *
 * @param arr the array to insert value into.
 * @param index the index at which to insert the value.
 * @param newItem the new item to be inserted.
 */
export declare function arrayInsert(arr: any[], index: number, newItem: any): any[];
/**
 * If undefined empty array is returned otherwise the array or value wrapped as array is.
 *
 * @param value the value to inspect as any array.
 */
export declare function ensureArray<T = any>(value?: null | T | T[]): T[];
