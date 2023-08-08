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
/**
 * Simple function using indexOf for SQL LIKE evaluation.
 *
 * @param query the search query.
 * @param value the value to apply search query against.
 */
export declare function isLike(query: string, value: any): boolean;
/**
 * Rudamentary search filter applying indexOf checking against all or specified accessor fields.
 *
 * @param query the search query.
 * @param items an array of items to apply the search to.
 * @param accessors optional accessor keys applying search to only these keys.
 */
export declare function searchArray<T extends Record<string, any>>(query: string, items: T[], ...accessors: (keyof T)[]): T[];
export type SortAccessor<T> = Extract<keyof T, string> | `-${Extract<keyof T, string>}`;
export type Primer = <T>(value: any, accessor: keyof T) => any;
export type Comparator = (a: any, b: any) => number;
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
export declare function sortArray<T extends Record<string, any>>(items: T[], accessors: SortAccessor<T>[], primer?: Primer): T[];
