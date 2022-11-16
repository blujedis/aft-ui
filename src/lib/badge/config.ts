import { config } from '../_config';
import { pick, pickVariant, type Palette, type TypeOrValue } from '@forewind/util';

const { fontWeight, shadow, rounded, fontTransform, colormap } = config;

const themes = pickVariant(colormap.theme, 'bg', 'ring_focus');
const defTheme = pick(colormap.theme.default, 'bg', 'text');

const main = {
	base: `inline-flex items-center justify-center`,
	pointer: 'cursor-pointer',
	rounded: { ...rounded },
	shadow: { ...shadow },
	weight: {
		...fontWeight
	},
	transform: {
		...fontTransform
	},
	size: {
		none: '',
		xs: 'px-2 py-0.5 text-xs',
		sm: 'px-2.5 py-0.5 text-sm',
		md: 'px-3 py-0.5 text-md',
		lg: 'px-4 py-0.5 text-lg',
		xl: 'px-5 py-1.25 text-xl',
		'2xl': 'px-6 py-2 text-2xl'
	},
	hovered: (theme = 'default' as TypeOrValue<keyof Palette>) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		return conf.hover_checked;
	},
	variant: {
		default: {
			base: 'text-white',
			default: defTheme,
			themes: {
				...themes
			}
		}
	}
};

const badge = { main };

export default badge;
