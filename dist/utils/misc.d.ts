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
 * Removes undefined values.
 *
 * @param obj the object to be cleaned.
 */
export declare function cleanObj<T extends Record<string, unknown>>(obj?: T): Partial<T>;
