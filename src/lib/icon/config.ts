import { config } from '../app/config';
import { pickVariant, pick } from '@forewind/util';

const { shadow, rounded, common, colormap, animate } = config;

const ghost = pickVariant(colormap.theme, 'text');
const filled = pickVariant(colormap.theme, 'bg');
const outline = pickVariant(colormap.theme, 'text', 'border');

ghost.default = pick(colormap.theme.default, 'text', 'ring_focus');
filled.default = pick(colormap.theme.default, 'bg', 'text', 'ring_focus');
outline.default = pick(colormap.theme.default, 'text', 'border', 'ring_focus');

const main = {
	base: 'inline-flex items-center justify-center border',
	rounded: { ...rounded },
	shadow: { ...shadow },
	transition: common.transition,
	animate: animate,
	active: common.active,
	disabled: common.disabled,
	size: {
		unstyled: '',
		xs: 'h-4 w-4',
		sm: 'h-5 w-5',
		md: 'h-6 w-6',
		lg: 'h-8 w-8',
		xl: 'h-10 w-10',
		'2xl': 'h-12 w-12'
	},
	border: [] as const,
	hovered: (variant: any, theme = 'default' as any) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		if (variant === 'filled') return conf.bg_hover;
		return conf.text_hover;
	},
	variant: {
		filled: {
			base: 'text-white border-transparent',
			themes: {
				...filled
			}
		},
		outlined: {
			base: 'border-2',
			themes: {
				...outline
			}
		},
		ghost: {
			base: 'border-transparent',
			themes: {
				...ghost
			}
		}
	}
};

const inner = {
	base: 'block',
	size: { ...main.size}
};

const icon = { main, inner };

export default icon;
