

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export function noop(...args: any) { }

/**
 * Generates a cheap unique ID.
 *
 * @param radix the numberic value used to convert to strings.
 */
export function uniqid(radix = 16) {
	return '#' + ((Math.random() * 0xffffff) << 0).toString(radix);
}

/**
 * Indicates DOM is ready and usable.
 */
export function DOMEnabled() {
	return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export function debounce<T>(func: (...args: T[]) => unknown, delay = 200): typeof func {
	let timeout: number | NodeJS.Timeout;
	return function (...args: T[]) {
		clearTimeout(timeout as number);
		timeout = setTimeout(() => func(...args), delay);
	};
}

/**
 * Converts a boolean to a mapped key value.
 * 
 * @param value the boolean value to map to key.
 */
export function boolToMapValue<T = unknown>(value: T) {
	if (value === true) return 'true';
	if (value === false) return 'false';
	if (typeof value === 'string') return value as Exclude<T, true | false>;
	return undefined;
}

export interface PlaceholderMedia {
	background?: string; // hex or css named color
	foreground?: string; // hex or css named color
	width?: number;
	height?: number;
	retina?: '2x' | '3x';
	text?: string;
	font?: 'lato' | 'lora' | 'montserrat' | 'open sans' | 'oswald' | 'playfair display' | 'pt sans' | 'raleway' | 'roboto' | 'source sans pro';
	format?: 'png' | 'jpg' | 'jpeg' | 'webp' | 'mp4' | 'svg';
}

const defaults = {
	font: 'lato',
	foreground: 'fff',
	width: 400
} as PlaceholderMedia;

const baseUrl = 'https://placehold.co';

function cleanObj(obj: Record<string, any>) {
	return Object.entries(obj).reduce((result, [k, v]) => {
		if (typeof v !== 'undefined')
			result[k] = v;
		return result;
	}, {} as Record<string, any>);
}

export function createPlaceholderUrl(options?: PlaceholderMedia) {
	options = {
		...defaults,
		...options
	};

	const { background, foreground, width, height, format, text, font, retina } = options;

	if (!width && !height)
		throw new Error(`Create Placeholder requires a height or width to be provided.`);

	const arr = [baseUrl];
	const params = { text, font } as Record<string, string>;

	const size = (width && height ? width + 'x' + height : width || '') + '';

	if (size)
		arr.push(size);

	if (background && foreground) {
		arr.push(background)
		arr.push(foreground);
	}

	let suffix = format ? '.' + format.replace(/^\./, '') : '';
	if (retina)
		suffix = `@${retina}` + suffix;

	const query = new URLSearchParams(cleanObj(params)).toString();

	return arr.join('/') + suffix + (query ? '?' + query : '');

}