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
export declare function debounce<T>(func: (...args: T[]) => unknown, delay?: number): typeof func;
