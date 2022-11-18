import { pick, pickVariant, type Palette, type TypeOrValue } from '@forewind/util';
import config from '../../_config/config';

const { colormap } = config;
const defTheme = pick(colormap.theme.default, 'hover_glass', 'text');
const themes = pickVariant(colormap.theme, 'hover_text_white', 'hover', 'text');

const main = {
	base: 'relative cursor-default select-none outline-none ring-0 py-1.5 pl-3 pr-9',
	position: {
		left: 'left-0 pl-1.5',
		right: 'right-0 pr-4'
	},
	inactive: (theme: TypeOrValue<keyof Palette>) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme || 'default'];
		return conf.state_inactive;
	},
	active: (theme: TypeOrValue<keyof Palette>) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme || 'default'];
		return conf.state_active;
	},
	selected: (theme: TypeOrValue<keyof Palette>) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme || 'default'];
		return conf.state_selected;
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
