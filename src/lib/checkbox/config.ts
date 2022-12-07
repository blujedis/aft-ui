import { config } from '../app/config';
import { pickVariant, pick, classnames, type TypeOrValue, type Palette } from '@forewind/util';

const { shadow, rounded, common, colormap } = config;

// const default_ring = pick(colormap.theme.default, 'ring_focus');
// const defTheme = {
// 	...pick(colormap.theme.default, 'bg', 'text', 'ring_focus', 'bg_checked'),
// 	default_ring
// };

const themes = pickVariant(colormap.theme, 'text', 'ring_focus', 'bg_checked');
themes.default = pick(colormap.theme.default, 'bg', 'text', 'ring_focus', 'bg_checked', 'ring_focus');

const main = {
	base: classnames(
		'focus:ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 text-slate-600',
		themes.default
	),
	rounded: { ...rounded },
	shadow: { ...shadow },
	transition: common.transition,
	ringed: common.ringed,
	active: common.active,
	size: {
		xs: 'h-3 w-3',
		sm: 'h-3.5 w-3.5',
		md: 'h-4 w-4',
		lg: 'h-5 w-5',
		xl: 'h-6 w-6',
		'2xl': 'h-7 w-7'
	},
	hovered: (theme = 'default' as TypeOrValue<keyof Palette>) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		return conf.bg_checked_hover;
	},
	variant: {
		default: {
			base: '',
			// default: '',
			themes: {
				...themes
			}
		}
	}
};

const checkbox = { main };

export default checkbox;
