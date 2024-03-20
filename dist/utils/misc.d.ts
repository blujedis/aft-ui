export declare function noop(...args: any): void;
/**
 * Generates a cheap unique ID.
 *
 * @param radix the numberic value used to convert to strings.
 */
export declare function uniqid(radix?: number): string;
/**
 * Indicates DOM is ready and usable.
 */
export declare function DOMEnabled(): boolean;
/**
 * Simple debounce function used when submitting requests.
 *
 * @param func the callback function to be called
 * @param delay the delay to debounce (default: 200
 * ms)
 */
export declare function debounce<T>(func: (...args: T[]) => unknown, delay?: number): typeof func;
/**
 * Converts a boolean to a mapped key value.
 *
 * @param value the boolean value to map to key.
 */
export declare function boolToMapValue<T = unknown>(value: T): "true" | "false" | Exclude<T, boolean> | undefined;
