/* eslint-disable no-fallthrough */

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
export function toRegexp(glob: string, options = {} as GlobToRegexpOptions) {
	if (typeof glob !== 'string') throw new TypeError('Expected a string');

	options.flags = options.flags || '';
	options.flags = Array.isArray(options.flags) ? options.flags.join('') : options.flags;

	const str = String(glob);

	// The regexp we are building, as a string.
	let reStr = '';

	// Whether we are matching so called "extended" globs (like bash) and should
	// support single character matching, matching ranges of characters, group
	// matching, etc.
	const extended = options ? !!options.extended : false;

	// When globstar is _false_ (default), '/foo/*' is translated a regexp like
	// '^\/foo\/.*$' which will match any string beginning with '/foo/'
	// When globstar is _true_, '/foo/*' is translated to regexp like
	// '^\/foo\/[^/]*$' which will match any string beginning with '/foo/' BUT
	// which does not have a '/' to the right of it.
	// E.g. with '/foo/*' these will match: '/foo/bar', '/foo/bar.txt' but
	// these will not '/foo/bar/baz', '/foo/bar/baz.txt'
	// Lastely, when globstar is _true_, '/foo/**' is equivelant to '/foo/*' when
	// globstar is _false_
	const globstar = options ? !!options.globstar : false;

	// If we are doing extended matching, this boolean is true when we are inside
	// a group (eg {*.html,*.js}), and false otherwise.
	let inGroup = false;

	// RegExp flags (eg "i" ) to pass in to RegExp constructor.
	const flags = options && typeof options.flags === 'string' ? options.flags : '';

	let c;

	for (let i = 0, len = str.length; i < len; i++) {
		c = str[i];

		switch (c) {
			case '/':
			case '$':
			case '^':
			case '+':
			case '.':
			case '(':
			case ')':
			case '=':
			case '!':
			case '|': {
				reStr += '\\' + c;
				break;
			}

			case '?': {
				if (extended) {
					reStr += '.';
					break;
				}
			}

			case '[':
			case ']': {
				if (extended) {
					reStr += c;
					break;
				}
			}

			case '{': {
				if (extended) {
					inGroup = true;
					reStr += '(';
					break;
				}
			}

			case '}': {
				if (extended) {
					inGroup = false;
					reStr += ')';
					break;
				}
			}

			case ',': {
				if (inGroup) {
					reStr += '|';
					break;
				}
				reStr += '\\' + c;
				break;
			}

			case '*': {
				// Move over all consecutive "*"'s.
				// Also store the previous and next characters
				const prevChar = str[i - 1];
				let starCount = 1;

				while (str[i + 1] === '*') {
					starCount++;
					i++;
				}

				const nextChar = str[i + 1];

				if (!globstar) {
					// globstar is disabled, so treat any number of "*" as one
					reStr += '.*';
				} else {
					// globstar is enabled, so determine if this is a globstar segment
					const isGlobstar =
						starCount > 1 && // multiple "*"'s
						(prevChar === '/' || prevChar === undefined) && // from the start of the segment
						(nextChar === '/' || nextChar === undefined); // to the end of the segment

					if (isGlobstar) {
						// it's a globstar, so match zero or more path segments
						reStr += '((?:[^/]*(?:/|$))*)';
						i++; // move over the "/"
					} else {
						// it's not a globstar, so only match one path segment
						reStr += '([^/]*)';
					}
				}

				break;
			}

			default:
				reStr += c;
		}
	}

	// When regexp 'g' flag is specified don't
	// constrain the regular expression with ^ & $
	if (!flags || !~flags.indexOf('g')) reStr = '^' + reStr + '$';

	return new RegExp(reStr, flags);
}

/**
 * Creates a matcher function for repeated use of expression.
 *
 * @param glob the glob pattern to create expression for.
 * @param options the options to be applied.
 */
export function isMatch(glob: any, options?: GlobToRegexpOptions) {
	options = {
		globstar: true,
		extended: true,
		flags: 'i'
	};
	let pattern = String(glob);
	const negated = pattern.charAt(0) === '!';
	if (negated) pattern = pattern.slice(1);
	const exp = toRegexp(pattern, options);
	return (value: string) => {
		const match = exp.test(value);
		if (!negated) return !match;
		return match;
	};
}
