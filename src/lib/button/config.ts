import { config } from '../app/config';
import {
	classnames,
	pick,
	pickVariant,
	type Palette,
	type TypeOrValue,
	mergeConfigs
} from '@forewind/util';

const {
	rounded,
	shadow,
	font_weight,
	font_transform,
	common,
	colormap,
	field_padding_y,
} = config;

const filled = pickVariant(colormap.theme, 'bg', 'ring_focus');
const outline = pickVariant(colormap.theme, 'text', 'border', 'ring_focus');
const ghost = pickVariant(colormap.theme, 'text', 'ring_focus');
const link = pickVariant(colormap.theme, 'text');

// Add defaults to variants.
filled.default = pick(colormap.theme.default, 'bg', 'text', 'ring_focus');
outline.default = pick(colormap.theme.default, 'text', 'border', 'ring_focus');
ghost.default = pick(colormap.theme.default, 'text', 'ring_focus');
link.default = pick(colormap.theme.default, 'text', 'ring_focus');

const main = {
	base: classnames(
		'focus:ring-0 inline-flex items-center justify-center font-medium focus:outline-none text-sm border border-transparent',
		common.shadow
	),
	active: common.active,
	disabled: common.disabled,
	full: 'w-full',
	hovered: (
		variant: TypeOrValue<'filled' | 'outline' | 'ghost' | 'link'>,
		theme = 'default' as TypeOrValue<keyof Palette | 'default'>
	) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		if (variant === 'link') return 'hover:underline';
		if (variant === 'filled') return conf.bg_hover;
		else return conf.bg_glass_hover;
	},
	ringed: common.ringed,
	rounded: { ...rounded },
	shadow: { ...shadow },
	size: mergeConfigs(
		{
			none: '',
			xs: 'px-3',
			sm: 'px-4',
			md: 'px-6',
			lg: 'px-8',
			xl: 'px-10',
			'2xl': 'px-12'
		},
		field_padding_y
	),
	transform: {
		...font_transform
	},
	transition: common.transition,
	weight: {
		...font_weight
	},
	variant: {
		filled: {
			base: 'border-transparent text-white',
			themes: {
				...filled
			}
		},
		outline: {
			base: 'bg-transparent',
			themes: {
				...outline
			}
		},
		ghost: {
			base: 'bg-transparent border-transparent',
			themes: {
				...ghost
			}
		},
		link: {
			base: 'bg-transparent border-transparent',
			filters: ['px.+', 'py.+'], // remove size padding not needed for link.
			themes: {
				...link
			}
		}
	}
};

const button = { main };

export default button;
