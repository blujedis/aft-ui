import { cleanObj } from '.';
const defaults = {
    font: 'lato',
    foreground: 'fff',
    width: 400
};
const baseUrl = 'https://placehold.co';
export function createPlaceholderUrl(options) {
    options = {
        ...defaults,
        ...options
    };
    const { background, foreground, width, height, format, text, font, retina } = options;
    if (!width && !height)
        throw new Error(`Create Placeholder requires a height or width to be provided.`);
    const arr = [baseUrl];
    const params = { text, font };
    const size = (width && height ? width + 'x' + height : width || '') + '';
    if (size)
        arr.push(size);
    if (background && foreground) {
        arr.push(background);
        arr.push(foreground);
    }
    let suffix = format ? '.' + format.replace(/^\./, '') : '';
    if (retina)
        suffix = `@${retina}` + suffix;
    const query = new URLSearchParams(cleanObj(params)).toString();
    return arr.join('/') + suffix + (query ? '?' + query : '');
}
