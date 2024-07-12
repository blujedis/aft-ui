export interface GlobToRegexpOptions {
    extended?: boolean;
    globstar?: boolean;
    flags?: string | string[];
}
/**
 * Creates RegExp for glob pattern.
 *
 * @param glob the glob pattern to create expression for.
 * @param options glob to regexp options
 */
export declare function toRegexp(glob: string, options?: GlobToRegexpOptions): RegExp;
/**
 * Creates a matcher function for repeated use of expression.
 *
 * @param glob the glob pattern to create expression for.
 * @param options the options to be applied.
 */
export declare function isMatch(glob: any, options?: GlobToRegexpOptions): (value: string) => boolean;
