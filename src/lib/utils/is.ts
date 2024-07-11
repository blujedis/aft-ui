/**
 * Gets the JavaScript type for value.
 *
 * @param value the value to get type for.
 */
export function getTypeOf(value: unknown) {
	return typeof value;
}

/**
 * Gets the JavaScript type for value, when object returns object, array, null or date.
 *
 * @param value the value to get type for.
 */
export function getType(value: unknown) {
	const type = getTypeOf(value);
	if (type !== 'object') return type;
	if (isArray(value)) return 'array';
	if (isNull(value)) return 'null';
	if (isDate(value)) return 'date';
	return 'object';
}

/**
 * Gets the JavaScript stuctural type for the specified object.
 *
 * @param value the value to get structural type for.
 */
export function getConstructorType(value: unknown) {
	if (isUndefined(value)) return 'undefined';
	if (isNull(value)) return 'null';
	if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
		const name = value.constructor.name;
		if (name === 'Function' && typeof value === 'function')
			return value.name || 'Anonymous Function';
		return value.constructor.name;
	}
	return null;
}

/**
 * Checks if value is same type as compare value.
 *
 * @param value the value to inspect as type.
 * @param compare the value to match as type.
 */
export function isType(value: unknown, compare: string) {
	return isEqual(getType(value), (compare || '').toLowerCase());
}

/**
 * Checks if value is same constructor type as compare value.
 *
 * @param value the value to inspect as constructor type.
 * @param compare the value to match as constructor type.
 */
export function isConstructorType(value: unknown, compare: string) {
	const ctor = getConstructorType(value);
	if (ctor) return isEqual(ctor.toLowerCase(), (compare || '').toLowerCase());
	return false;
}

/**
 * Simple function using indexOf for SQL LIKE evaluation.
 *
 * @param value the value to compare.
 * @param compare the value to inspect as like above value.
 */
export function isLike(value: string, compare: string): boolean {
	value = value.toLowerCase();
	compare = compare.toLowerCase();
	return compare.indexOf(value) > -1;
}

/**
 * Checks if value is instanceOf Type.
 *
 * @param value the value to inspect as instanceOf.
 */
export function isInstanceOf(value: unknown, Type: any) {
	return value instanceof Type;
}

/**
 * Checks if value is a string.
 *
 * @param value the value to inspect as string.
 */
export function isString(value: unknown): value is string {
	return typeof value === 'string';
}

/**
 * Checks if value is a number.
 *
 * @param value the value to inspect as number.
 */
export function isNumber(value: unknown): value is number {
	return typeof value === 'number';
}

/**
 * Checks if a string or number is a digit.
 *
 * @param value the value to inspect as a digit.
 * @param clean when true string values will be first cleaned of tokens.
 */
export function isDigit(
	value: unknown,
	clean = false as boolean | string[]
): value is number | string {
	if (isNumber(value)) return (value + '').length === 1; // if more than one not a single digit.
	if (typeof value === 'undefined' || value === null || typeof value !== 'string') return false;
	if (clean)
		['-', '+', '=', '(', ')', '%', '#', '$', '{', '}', '<', '>'].forEach((v) =>
			value.replace(v, '')
		);
	return value >= '0' && value <= '9';
}

/**
 * Inspects a value, string or number and checks if is numeric.
 *
 * @param value the value to inspect as numeric
 * @param clean when true string values are cleaned of specified/default tokens.
 */
export function isNumeric(
	value: unknown,
	clean = false as boolean | string[]
): value is number | string {
	if (isNumber(value)) return true;
	if (value === null || typeof value !== 'string' || !value.length) return false;
	const _value = value.trim();
	const len = _value.length;
	for (let i = 0; i < len; i++) {
		if (!isDigit(_value.charAt(i), clean)) return false;
	}
	return true;
}

/**
 * Checks if value is an object.
 *
 * @param value the value to inspect as object.
 */
export function isObject(value: unknown): value is object {
	return value !== null && typeof value === 'object';
}

/**
 * Checks if value is a function.
 *
 * @param value the value to inspect as function.
 */
export function isFunction(value: unknown): value is (...args: any[]) => any {
	return typeof value === 'function';
}

/**
 * Checks if value is a date instance.
 *
 * @param value the value to inspect as date.
 */
export function isDate(value: unknown): value is Date {
	return value instanceof Date && !isNaN(value as any);
}

/**
 * This is a rudamentary check for a date. It is used to prevent the need
 * for a third party libary. While it will have fairly good coverage you should not
 * depend on this function over a date/time library.
 *
 * @param value the value to inspect as a Date.
 */
export function isValidDate(value: unknown): value is number | Date | string {
	if (typeof value !== 'string' && typeof value !== 'number' && !(value instanceof Date))
		return false;
	try {
		if (typeof value === 'number') value = new Date(value).toString();
		const date = new Date(value as string);
		return (
			!isNaN(Date.parse(value as any)) && date instanceof Date && !isNaN(date as unknown as number)
		);
	} catch (ex) {
		return false;
	}
}

/**
 * Checks if Object is a plain object literal.
 *
 * @param value the value to inspect as plain object literal.
 */
export function isPlainObject(value: unknown): value is object {
	return (
		isObject(value) === true &&
		Object.prototype.toString.call(value) === '[object Object]' &&
		isFunction((value as object).constructor) &&
		(value as object).constructor?.name === 'Object'
	);
}

/**
 * Checks if value is a JavaScript Primitive.
 *
 * @param value the value to inspect as primitive.
 */
export function isPrimitive(value: unknown) {
	return value !== Object(value);
}

/**
 * Compares two values and determines if they are equal.
 *
 * @param value the value to be compared.
 * @param compare the value to match as equal.
 */
export function isEqual(value: unknown, compare: unknown) {
	return value === compare;
}

/**
 * Compares two values and determines if they are NOT equal.
 *
 * @param value the value to be compared.
 * @param compare the value to inspect as NOT equal.
 */
export function isNotEqual(value: unknown, compare: unknown) {
	return !isEqual(value, compare);
}

/**
 * Checks if two objects are deeply equal.
 * NOTE: this is a loose check for most common scenarios.
 * If you need something more robust checkout Lodash _.isDeepEqual
 *
 * @param value the value to be compared.
 * @param compare the value to inspect as deep equal.
 */
export function isDeepEqual(value: unknown, compare: unknown) {
	function deepEqual(obj1: any, obj2: any) {
		// it's just the same object. No need to compare.
		if (obj1 === obj2) return true;

		// compare primitives no need to iterate.
		if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;

		if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

		const cType1 = getConstructorType(obj1);
		const cType2 = getConstructorType(obj1);

		if (isNotEqual(cType1, cType2)) return false;

		// If structural type is Map or Set
		// Convert to simple objects to compare.
		if (['Map', 'WeakMap', 'Set', 'WeakSet'].includes(cType1 || '')) {
			obj1 = Object.fromEntries(obj1);
			obj2 = Object.fromEntries(obj2);
		}

		// compare objects with same number of keys
		for (const key in obj1) {
			// other object doesn't have this prop.
			if (!(key in obj2)) return false;

			if (!deepEqual(obj1[key], obj2[key])) return false;
		}

		return true;
	}

	return deepEqual(value, compare);
}

/**
 * Checks if two objects are NOT deeply equal.
 *
 * @param value the value to be compared.
 * @param compare the value to inspect as NOT deep equal.
 */
export function isNotDeepEqual(value: unknown, compare: unknown) {
	return !isDeepEqual(value, compare);
}

/**
 * Checks if string, array or object is empty.
 *
 * @param value the value to inspect as empty string, array or object.
 */
export function isEmpty(value: unknown) {
	return (
		(isString(value) && isEqual(value, '')) ||
		(isArray(value) && isEqual((value as any[]).length, 0)) ||
		(isPlainObject(value) && isEqual(Object.keys(value as object).length, 0))
	);
}

/**
 * Checks if string, array or object is not empty.
 *
 * @param value the value to inspect as not empty string, array or object.
 */
export function isNotEmpty(value: unknown) {
	return !isEmpty(value);
}

/**
 * Checks if value is greater than compare.
 *
 * @param value the value to inspect as greater than compare.
 * @param compare the value to inspect as less than value.
 */
export function isGreaterThan(value: any, compare: any) {
	return value > compare;
}

/**
 * Checks if value is greater than or equal to compare.
 *
 * @param value the value to inspect as greater than or equal to compare.
 * @param compare the value to inspect as less than or equal to value.
 */
export function isGreaterThanOrEqual(value: any, compare: any) {
	return value >= compare;
}

/**
 * Checks if value is less than compare.
 *
 * @param value the value to inspect as less than compare.
 * @param compare the value to inspect as greater than value.
 */
export function isLessThan(value: any, compare: any) {
	return value < compare;
}

/**
 * Checks if value is less than or equal to compare.
 *
 * @param value the value to inspect as less than or equal to compare.
 * @param compare the value to inspect as greater than or equal to value.
 */
export function isLessThanOrEqual(value: any, compare: any) {
	return value <= compare;
}

/**
 * Checks if value is boolean.
 *
 * @param value the value to inspect as boolean.
 * @param loose when true will return true if 'true' or 'false' or 0 or 1.
 */
export function isBoolean(value: unknown, loose = false) {
	if (!loose) return typeof value === 'boolean';
	if (typeof value === 'number') return value === 0 || value === 1;
	if (typeof value === 'string') return /(true|false)/.test(value);
	return false;
}

/**
 * Checks if has some value.
 *
 * @param value the value to inspect as having some value.
 */
export function isValue(value: unknown) {
	return !isUndefined(value) && !isNull(value) && !isNaN(value as number);
}

/**
 * Checks if is true.
 *
 * @param value the value to inspect as true.
 * @param loose when true, returns true if true, 1 or 'yes'.
 */
export function isTrue(value: unknown, loose = false): value is true {
	if (!loose) return value === true;
	return value === 1 || value === 'true' || value === 'yes';
}

/**
 * Checks if is false.
 *
 * @param value the value to inspect as false.
 * @param loose when true, returns false if false, 0 or 'no'.
 */
export function isFalse(value: unknown, loose = false): value is false {
	if (!loose) return value === true;
	return value === 0 || value === 'false' || value === 'no';
}

/**
 * Checks if the value is truthy.
 *
 * @param value the value to inspect as a truthy value.
 */
export function isTruthy(value: unknown) {
	return (
		typeof value !== 'undefined' &&
		value !== null &&
		value !== 0 &&
		value !== false &&
		!(value instanceof Error)
	);
}

/**
 * Checks if value is null.
 *
 * @param value the value to inspect as null.
 */
export function isNull(value: unknown): value is null {
	return value === null;
}

/**
 * Checks if value is undefined.
 *
 * @param value the value to inspect as undefined.
 */
export function isUndefined(value: unknown): value is undefined {
	return typeof value === 'undefined';
}

/**
 * Checks if value is an array.
 *
 * @param value the value to inspect as array.
 */
export function isArray(value: unknown): value is any[] {
	return Array.isArray(value);
}

/**
 * Checks if the value is a promise.
 *
 * @param value the value to inspect as a promise.
 */
export function isPromise(value: unknown): value is Promise<any> {
	return Promise.resolve(value) === value;
}

/**
 * Checks if the value is an instance of Error.
 *
 * @param value the value to inspect as Error.
 */
export function isError(value: unknown): value is Error {
	return value instanceof Error;
}
