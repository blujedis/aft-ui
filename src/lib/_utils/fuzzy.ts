/**
 * This file is intended for light use. If you need a more
 * robust solution I would suggesting heading over to Fuse.js
 * as it is a complete Fuzzy searching algorithm!
 *
 * @see https://fusejs.io/
 */
export type Strategy = 'decimal' | 'percentage' | 'simple';

export interface FuzzyOptions<T extends Record<string, any> = Record<string, any>> {
	/**
	 * Allowable threshold either decimal, percentage or value from 1-10
	 */
	threshold?: number;

	/**
	 * The strategy to use decimal, percentage or simple for digit 1-10.
	 */
	strategy?: Strategy;

	/**
	 * The number of decimals allowed when calculating.
	 */
	places?: number;

	/**
	 * When haystack is an object the keys to check similarity against.
	 */
	keys?: (keyof T)[];
}

export interface FuzzyResult {
	needle: string;
	haystack: string;
	strategy: Strategy;
	threshold: number;
	score: number;
	distance: number;
	match: boolean;
}

/**
 * See below for original source. Types were incorrect.
 *
 * @see https://github.com/sindresorhus/leven/blob/main/index.js
 */
const pos = [] as number[];
const charCache = [] as number[];
const defaults = {
	strategy: 'simple' as Strategy,
	places: 2,
	threshold: 4,
	keys: [] as string[]
};

/**
 * Compares distance between two string.
 *
 * @param first the first value to compare.
 * @param second the second value to compare.
 */
function leven(first: string, second: string) {
	if (first === second) return 0;

	const swap = first;

	// Swapping the strings if `a` is longer than `b` so we know which one is the
	// shortest & which one is the longest
	if (first.length > second.length) {
		first = second;
		second = swap;
	}

	let firstLen = first.length;
	let secondLen = second.length;

	// Performing suffix trimming:
	// We can linearly drop suffix common to both strings since they
	// don't increase distance at all
	// Note: `~-` is the bitwise way to perform a `- 1` operation
	while (firstLen > 0 && first.charCodeAt(~-firstLen) === second.charCodeAt(~-secondLen)) {
		firstLen--;
		secondLen--;
	}

	// Performing prefix trimming
	// We can linearly drop prefix common to both strings since they
	// don't increase distance at all
	let start = 0;

	while (start < firstLen && first.charCodeAt(start) === second.charCodeAt(start)) {
		start++;
	}

	firstLen -= start;
	secondLen -= start;

	if (firstLen === 0) {
		return secondLen;
	}

	let result = undefined as number | undefined;
	let altCharCode: number;
	let tmp1: number;
	let tmp2: number;
	let index = 0;
	let index2 = 0;

	while (index < firstLen) {
		charCache[index] = first.charCodeAt(start + index);
		pos[index] = ++index;
	}

	while (index2 < secondLen) {
		altCharCode = second.charCodeAt(start + index2);
		tmp1 = index2++;
		result = index2;

		for (index = 0; index < firstLen; index++) {
			tmp2 = altCharCode === charCache[index] ? tmp1 : tmp1 + 1;

			tmp1 = pos[index];

			// eslint-disable-next-line no-multi-assign
			result = pos[index] =
				tmp1 > result ? (tmp2 > result ? result + 1 : tmp2) : tmp2 > tmp1 ? tmp1 + 1 : tmp2;
		}
	}

	return result || 999999; // if using beyond 999999 check into a hospital :)
}

/**
 * Finds the similarity of two strings using Levenstein algorithm result.
 *
 * @param needle the needle to compare against haystack.
 * @param haystack the value to find distance against.
 * @param options the options used to find similarity.
 */
function similarity(
	needle: string,
	haystack = '',
	options = { strategy: 'simple', places: 2 } as Pick<FuzzyOptions, 'strategy' | 'places'>
) {
	if (needle.length > haystack.length) {
		const source = needle;
		needle = haystack;
		haystack = source;
	}
	const { strategy, places } = options;
	const distance = leven(needle, haystack);
	let score = (haystack.length - distance) / parseFloat(haystack.length + '');
	if (strategy === 'decimal') return { score, distance };
	score = parseFloat(score.toFixed(places));
	if (strategy === 'percentage') return { score: score * 100, distance };
	if (strategy === 'simple') return { score: (score * 100) / 10, distance };
	return { score, distance };
}

/**
 * Does a simple match for similarity and threshold returning whether the value
 * is a match and is greater than or equal to the threshold.
 *
 * @example
 * fuzzyMatch('pet', 'peter',  2) > boolean
 *
 * @param needle the needle to evaluate against haystack.
 * @param haystack the haystack string to be evaluated for match.
 * @param threshold the max allowable threshold from 1-10.
 */
export function fuzzyMatch(needle: string, haystack: string, threshold?: number): boolean;

/**
 * Does a simple match for similarity and threshold returning whether the value
 * is a match and is greater than or equal to the threshold.
 *
 * @example
 * fuzzyMatch('pet', 'peter', { threshold: 2}) > boolean
 *
 * @param needle the needle to evaluate against haystack.
 * @param haystack the haystack string to be evaluated for match.
 * @param options the options to apply in search.
 */
export function fuzzyMatch(
	needle: string,
	haystack: string,
	options?: Omit<FuzzyOptions, 'keys'>
): boolean;
export function fuzzyMatch(
	needle: string,
	haystack: string,
	optionsOrThreshold?: number | Omit<FuzzyOptions, 'keys'>
) {
	let options = optionsOrThreshold as FuzzyOptions;
	if (typeof optionsOrThreshold === 'number') {
		options = {
			threshold: optionsOrThreshold
		};
	}

	options = {
		...defaults,
		...options
	};

	const { strategy, places, threshold } = options as Required<FuzzyOptions>;

	return similarity(needle, haystack, { strategy, places }).score >= threshold;
}

/**
 * Does fuzzy search returning all data including similarity score if is
 * match, the needle and data compared and the strategy used.
 *
 * @example
 * fuzzyFull('pet', 'peter', 2) > {
 *  needle: 'pet',
 *  haystack: 'peter',
 *  strategy: 'simple',
 *  threshold: 2,
 *  score: 1,
 *  match: true
 * }
 *
 * @param needle the needle to evaluate against haystack.
 * @param haystack the haystack string to be evaluated for match.
 * @param threshold the max allowable threshold from 1-10.
 */
export function fuzzyFull(needle: string, haystack: string, threshold?: number): FuzzyResult;

/**
 * Does fuzzy search returning all data including similarity score if is
 * match, the needle and data compared and the strategy used.
 *
 * @example
 * fuzzyFull('pet', 'peter', { threshold: 2}) > {
 *  needle: 'pet',
 *  haystack: 'peter',
 *  strategy: 'simple',
 *  threshold: 2,
 *  score: 1,
 *  match: true
 * }
 *
 * @param needle the needle to evaluate against haystack.
 * @param haystack the haystack string to be evaluated for match.
 * @param options the options to apply in search.
 */
export function fuzzyFull(
	needle: string,
	haystack: string,
	options?: Omit<FuzzyOptions, 'keys'>
): FuzzyResult;

export function fuzzyFull(
	needle: string,
	haystack: string,
	optionsOrThreshold?: number | Omit<FuzzyOptions, 'keys'>
) {
	let options = optionsOrThreshold as FuzzyOptions;
	if (typeof optionsOrThreshold === 'number') {
		options = {
			threshold: optionsOrThreshold
		};
	}

	options = {
		...defaults,
		...options
	};

	const { strategy, places, threshold } = options as Required<FuzzyOptions>;
	const { score, distance } = similarity(needle, haystack, { strategy, places });

	return {
		needle,
		haystack,
		strategy,
		threshold,
		score,
		distance,
		match: score >= threshold
	};
}

/**
 * Filters array of values which match the needles threshold.
 *
 * @example
 * fuzzyMatch('pet', ['peter', 'paul', 'john'], { threshold: 2}) > boolean
 *
 * @param needle the needle to evaluate against haystack.
 * @param haystack the haystack string to be evaluated for match.
 * @param options the options to apply in search.
 */
export function fuzzyFilter(
	needle: string,
	haystack: (string | Record<string, any>)[],
	options?: FuzzyOptions
) {
	options = {
		...defaults,
		keys: typeof haystack[0] === 'string' ? undefined : ([] as any),
		...options
	};

	const { keys } = options as Required<FuzzyOptions>;

	// Array of string.
	if (!keys) return haystack.filter((v) => fuzzyMatch(needle, v as string, { ...options }));

	// Array of objects.
	return haystack.filter((v) =>
		keys.some((k) => fuzzyMatch(needle, (v as any)[k], { ...options }))
	);
}
