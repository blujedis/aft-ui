import { concat, pick, pickVariant, type Palette, type TypeOrValue } from '@forewind/util';
import config from '../../app/config/config';

const { colormap } = config;
// const defTheme = pick(colormap.theme.default, 'text', 'bg_glass_hover');
const themes = pickVariant(colormap.theme, 'text_white_hover', 'text', 'bg_hover');
themes.default = pick(colormap.theme.default, 'text', 'bg_glass_hover');

const main = {
	base: 'relative cursor-default select-none outline-none ring-0 py-1.5 pl-3 pr-9',
	position: {
		left: 'left-0 pl-1.5',
		right: 'right-0 pr-4'
	},
	state: (
		theme = 'default' as TypeOrValue<keyof Palette>,
		state = 'inactive' as 'active' | 'inactive',
	) => {
		if (state === 'inactive') return '';
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		return concat(conf.bg_active, conf.text_active, conf.bg_active_hover, conf.text_active_hover);
	},
	variant: {
		default: {
			// default: defTheme,
			themes: {
				...themes
			}
		}
	}
};

const icon = {
	base: 'absolute inset-y-0 flex items-center',
	position: main.position,
	state: (
		theme = 'default' as TypeOrValue<keyof Palette>,
		state = 'inactive' as 'active' | 'selected' | 'inactive',
	) => {
		if (state === 'inactive') return '';
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		if (state === 'active')
			return conf.text_active;
		return conf.text_selected;
	},
};

const item = {
	base: 'block truncate'
};

const comboboxOption = { main, icon, item };

export default comboboxOption;
