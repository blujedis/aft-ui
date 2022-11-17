import { pick, pickVariant } from '@forewind/util';
import config from '../../_config/config';

const { colormap } = config;
const defTheme = pick(colormap.theme.default, 'hover_glass', 'text', 'bg_active', 'text_active');
const themes = pickVariant(colormap.theme, 'hover_text_white', 'hover', 'text');

const main = {
	base: 'relative cursor-default select-none outline-none ring-0 py-1.5 pl-3 pr-9',
	position: {
		left: 'left-0 pl-1.5',
		right: 'right-0 pr-4'
	},
	selected: (theme: any) => {
		return '!bg-rose-600 !text-white';
	},
	variant: {
		default: {
			default: defTheme,
			themes: {
				...themes
			}
		}
	}
};

const icon = {
	base: 'absolute inset-y-0 flex items-center',
	position: main.position
};

const item = {
	base: 'block truncate'
};

const comboboxOption = { main, icon, item };

export default comboboxOption;
