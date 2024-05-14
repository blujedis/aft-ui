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
export declare function fuzzyMatch(needle: string, haystack: string, threshold?: number): boolean;
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
export declare function fuzzyMatch(needle: string, haystack: string, options?: Omit<FuzzyOptions, 'keys'>): boolean;
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
export declare function fuzzyFull(needle: string, haystack: string, threshold?: number): FuzzyResult;
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
export declare function fuzzyFull(needle: string, haystack: string, options?: Omit<FuzzyOptions, 'keys'>): FuzzyResult;
/**
 * Filters array of values which match the needles threshold.
 *
 * @example
 * fuzzyFilter('pet', ['peter', 'paul', 'john'], { threshold: 2}) >> boolean
 * fuzzyFilter('pet',
 * 	[{ name: peter }, { name: 'paul' }, { name: 'john'}],
 *  { threshold: 2, keys: ['name']}) >> boolean;
 *
 * @param needle the needle to evaluate against haystack.
 * @param haystack the haystack string to be evaluated for match.
 * @param options the options to apply in search.
 */
export declare function fuzzyFilter(needle: string, haystack: (string | Record<string, any>)[], options?: FuzzyOptions): (string | Record<string, any>)[];
