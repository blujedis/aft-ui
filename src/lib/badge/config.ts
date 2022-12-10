import { config } from '../app/config';
import { pick, pickVariant, type Palette, type TypeOrValue } from '@forewind/util';

const { font_weight, shadow, rounded, font_transform, colormap, common } = config;

// const defTheme = pick(colormap.theme.default, 'bg', 'text');
const themes = pickVariant(colormap.theme, 'bg', 'ring_focus');
themes.default = pick(colormap.theme.default, 'bg', 'text');

const main = {
	base: `inline-flex items-center justify-center`,
	pointer: 'cursor-pointer',
	rounded: { ...rounded },
	shadow: { ...shadow },
	transition: common.transition,
	weight: {
		...font_weight
	},
	transform: {
		...font_transform
	},
	size: {
		none: '',
		xs: 'px-1.5 py-0.5 text-[10px]',
		sm: 'px-2 py-0.5 text-xs',
		md: 'px-2.5 py-0.5 text-sm',
		lg: 'px-3 py-0.5 text-md',
		xl: 'px-4 py-1.25 text-lg',
		'2xl': 'px-5 py-2 text-xl'
	},
	hovered: (theme = 'default' as TypeOrValue<keyof Palette>) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		return conf.bg_checked_hover;
	},
	variant: {
		default: {
			base: 'text-white',
			// default: defTheme,
			themes: {
				...themes
			}
		}
	}
};

const badge = { main };

export default badge;
