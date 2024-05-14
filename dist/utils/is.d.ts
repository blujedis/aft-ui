/**
 * Gets the JavaScript type for value.
 *
 * @param value the value to get type for.
 */
export declare function getTypeOf(value: unknown): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";
/**
 * Gets the JavaScript type for value, when object returns object, array, null or date.
 *
 * @param value the value to get type for.
 */
export declare function getType(value: unknown): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "function" | "object" | "array" | "null" | "date";
/**
 * Gets the JavaScript stuctural type for the specified object.
 *
 * @param value the value to get structural type for.
 */
export declare function getConstructorType(value: unknown): string | null;
/**
 * Checks if value is same type as compare value.
 *
 * @param value the value to inspect as type.
 * @param compare the value to match as type.
 */
export declare function isType(value: unknown, compare: string): boolean;
/**
 * Checks if value is same constructor type as compare value.
 *
 * @param value the value to inspect as constructor type.
 * @param compare the value to match as constructor type.
 */
export declare function isConstructorType(value: unknown, compare: string): boolean;
/**
 * Simple function using indexOf for SQL LIKE evaluation.
 *
 * @param value the value to compare.
 * @param compare the value to inspect as like above value.
 */
export declare function isLike(value: string, compare: string): boolean;
/**
 * Checks if value is instanceOf Type.
 *
 * @param value the value to inspect as instanceOf.
 */
export declare function isInstanceOf(value: unknown, Type: any): boolean;
/**
 * Checks if value is a string.
 *
 * @param value the value to inspect as string.
 */
export declare function isString(value: unknown): value is string;
/**
 * Checks if value is a number.
 *
 * @param value the value to inspect as number.
 */
export declare function isNumber(value: unknown): value is number;
/**
 * Checks if a string or number is a digit.
 *
 * @param value the value to inspect as a digit.
 * @param clean when true string values will be first cleaned of tokens.
 */
export declare function isDigit(value: unknown, clean?: boolean | string[]): value is number | string;
/**
 * Inspects a value, string or number and checks if is numeric.
 *
 * @param value the value to inspect as numeric
 * @param clean when true string values are cleaned of specified/default tokens.
 */
export declare function isNumeric(value: unknown, clean?: boolean | string[]): value is number | string;
/**
 * Checks if value is an object.
 *
 * @param value the value to inspect as object.
 */
export declare function isObject(value: unknown): value is object;
/**
 * Checks if value is a function.
 *
 * @param value the value to inspect as function.
 */
export declare function isFunction(value: unknown): value is (...args: any[]) => any;
/**
 * Checks if value is a date instance.
 *
 * @param value the value to inspect as date.
 */
export declare function isDate(value: unknown): value is Date;
/**
 * This is a rudamentary check for a date. It is used to prevent the need
 * for a third party libary. While it will have fairly good coverage you should not
 * depend on this function over a date/time library.
 *
 * @param value the value to inspect as a Date.
 */
export declare function isValidDate(value: unknown): value is number | Date | string;
/**
 * Checks if Object is a plain object literal.
 *
 * @param value the value to inspect as plain object literal.
 */
export declare function isPlainObject(value: unknown): value is object;
/**
 * Checks if value is a JavaScript Primitive.
 *
 * @param value the value to inspect as primitive.
 */
export declare function isPrimitive(value: unknown): boolean;
/**
 * Compares two values and determines if they are equal.
 *
 * @param value the value to be compared.
 * @param compare the value to match as equal.
 */
export declare function isEqual(value: unknown, compare: unknown): boolean;
/**
 * Compares two values and determines if they are NOT equal.
 *
 * @param value the value to be compared.
 * @param compare the value to inspect as NOT equal.
 */
export declare function isNotEqual(value: unknown, compare: unknown): boolean;
/**
 * Checks if two objects are deeply equal.
 * NOTE: this is a loose check for most common scenarios.
 * If you need something more robust checkout Lodash _.isDeepEqual
 *
 * @param value the value to be compared.
 * @param compare the value to inspect as deep equal.
 */
export declare function isDeepEqual(value: unknown, compare: unknown): boolean;
/**
 * Checks if two objects are NOT deeply equal.
 *
 * @param value the value to be compared.
 * @param compare the value to inspect as NOT deep equal.
 */
export declare function isNotDeepEqual(value: unknown, compare: unknown): boolean;
/**
 * Checks if string, array or object is empty.
 *
 * @param value the value to inspect as empty string, array or object.
 */
export declare function isEmpty(value: unknown): boolean;
/**
 * Checks if string, array or object is not empty.
 *
 * @param value the value to inspect as not empty string, array or object.
 */
export declare function isNotEmpty(value: unknown): boolean;
/**
 * Checks if value is greater than compare.
 *
 * @param value the value to inspect as greater than compare.
 * @param compare the value to inspect as less than value.
 */
export declare function isGreaterThan(value: any, compare: any): boolean;
/**
 * Checks if value is greater than or equal to compare.
 *
 * @param value the value to inspect as greater than or equal to compare.
 * @param compare the value to inspect as less than or equal to value.
 */
export declare function isGreaterThanOrEqual(value: any, compare: any): boolean;
/**
 * Checks if value is less than compare.
 *
 * @param value the value to inspect as less than compare.
 * @param compare the value to inspect as greater than value.
 */
export declare function isLessThan(value: any, compare: any): boolean;
/**
 * Checks if value is less than or equal to compare.
 *
 * @param value the value to inspect as less than or equal to compare.
 * @param compare the value to inspect as greater than or equal to value.
 */
export declare function isLessThanOrEqual(value: any, compare: any): boolean;
/**
 * Checks if value is boolean.
 *
 * @param value the value to inspect as boolean.
 * @param loose when true will return true if 'true' or 'false' or 0 or 1.
 */
export declare function isBoolean(value: unknown, loose?: boolean): boolean;
/**
 * Checks if has some value.
 *
 * @param value the value to inspect as having some value.
 */
export declare function isValue(value: unknown): boolean;
/**
 * Checks if is true.
 *
 * @param value the value to inspect as true.
 * @param loose when true, returns true if true, 1 or 'yes'.
 */
export declare function isTrue(value: unknown, loose?: boolean): value is true;
/**
 * Checks if is false.
 *
 * @param value the value to inspect as false.
 * @param loose when true, returns false if false, 0 or 'no'.
 */
export declare function isFalse(value: unknown, loose?: boolean): value is false;
/**
 * Checks if the value is truthy.
 *
 * @param value the value to inspect as a truthy value.
 */
export declare function isTruthy(value: unknown): boolean;
/**
 * Checks if value is null.
 *
 * @param value the value to inspect as null.
 */
export declare function isNull(value: unknown): value is null;
/**
 * Checks if value is undefined.
 *
 * @param value the value to inspect as undefined.
 */
export declare function isUndefined(value: unknown): value is undefined;
/**
 * Checks if value is an array.
 *
 * @param value the value to inspect as array.
 */
export declare function isArray(value: unknown): value is any[];
/**
 * Checks if the value is a promise.
 *
 * @param value the value to inspect as a promise.
 */
export declare function isPromise(value: unknown): value is Promise<any>;
/**
 * Checks if the value is an instance of Error.
 *
 * @param value the value to inspect as Error.
 */
export declare function isError(value: unknown): value is Error;
