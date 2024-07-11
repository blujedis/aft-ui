import { cleanObj } from '.';

export interface PlaceholderMedia {
	background?: string; // hex or css named color
	foreground?: string; // hex or css named color
	width?: number;
	height?: number;
	retina?: '2x' | '3x';
	text?: string;
	font?:
		| 'lato'
		| 'lora'
		| 'montserrat'
		| 'open sans'
		| 'oswald'
		| 'playfair display'
		| 'pt sans'
		| 'raleway'
		| 'roboto'
		| 'source sans pro';
	format?: 'png' | 'jpg' | 'jpeg' | 'webp' | 'mp4' | 'svg';
}

const defaults = {
	font: 'lato',
	foreground: 'fff',
	width: 400
} as PlaceholderMedia;

const baseUrl = 'https://placehold.co';

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

	if (size) arr.push(size);

	if (background && foreground) {
		arr.push(background);
		arr.push(foreground);
	}

	let suffix = format ? '.' + format.replace(/^\./, '') : '';
	if (retina) suffix = `@${retina}` + suffix;

	const query = new URLSearchParams(cleanObj(params) as Record<string, string>).toString();

	return arr.join('/') + suffix + (query ? '?' + query : '');
}
