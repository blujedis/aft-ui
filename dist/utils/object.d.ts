/**
 * Removes undefined values.
 *
 * @param obj the object to be cleaned.
 */
export declare function cleanObj<T>(obj?: T): Partial<T>;
/**
 * Converts object into simple object literal using JSON.parse, JSON.stringify.
 *
 * @param obj the object to be cloned.
 */
export declare function simpleClone<T>(obj: T): any;
