/**
 * See below for original source. Types were incorrect.
 *
 * @see https://github.com/sindresorhus/leven/blob/main/index.js
 */
const pos = [];
const charCache = [];
const defaults = {
	strategy: 'simple',
	places: 2,
	threshold: 4,
	keys: []
};
/**
 * Compares distance between two string.
 *
 * @param first the first value to compare.
 * @param second the second value to compare.
 */
function leven(first, second) {
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
	let result = undefined;
	let altCharCode;
	let tmp1;
	let tmp2;
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
function similarity(needle, haystack = '', options = { strategy: 'simple', places: 2 }) {
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
export function fuzzyMatch(needle, haystack, optionsOrThreshold) {
	let options = optionsOrThreshold;
	if (typeof optionsOrThreshold === 'number') {
		options = {
			threshold: optionsOrThreshold
		};
	}
	options = {
		...defaults,
		...options
	};
	const { strategy, places, threshold } = options;
	return similarity(needle, haystack, { strategy, places }).score >= threshold;
}
export function fuzzyFull(needle, haystack, optionsOrThreshold) {
	let options = optionsOrThreshold;
	if (typeof optionsOrThreshold === 'number') {
		options = {
			threshold: optionsOrThreshold
		};
	}
	options = {
		...defaults,
		...options
	};
	const { strategy, places, threshold } = options;
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
export function fuzzyFilter(needle, haystack, options) {
	options = {
		...defaults,
		keys: typeof haystack[0] === 'string' ? undefined : [],
		...options
	};
	const { keys } = options;
	// Array of string.
	if (!keys) return haystack.filter((v) => fuzzyMatch(needle, v, { ...options }));
	// Array of objects.
	return haystack.filter((v) => keys.some((k) => fuzzyMatch(needle, v[k], { ...options })));
}
