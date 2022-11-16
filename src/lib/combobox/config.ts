import { concat, pick } from '@forewind/util';
import input from '../input/config';
import config from '../_config/config';

const { fieldTextSize, colormap, common, rounded } = config;

const defTheme = pick(colormap.theme.default, 'bg_form', 'text');

const main = {
	...input.main,
	base: concat(input.main.base, 'py-2', 'pr-12')
};

const wrapper = {
	base: 'relative',
	full: input.main.full
};

const button = {
	base: 'absolute flex items-center focus:outline-none inset-y-0 right-0 px-2'
};

const ul = {
	base: concat(
		'absolute z-10 overflow-auto focus:outline-none shadow-md ring-1 ring-black ring-opacity-5 mt-1 max-h-60 w-full py-1',
		common.shadow
	),
	size: fieldTextSize,
	rounded: { ...rounded },
	variant: {
		default: {
			base: colormap.theme.default.bg_form,
			default: defTheme,
			themes: {}
		}
	}
};

const combobox = { main, button, ul, wrapper };

export default combobox;
