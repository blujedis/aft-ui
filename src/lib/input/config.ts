import {
	classnames,
	mergeConfigs,
	pick,
	pickVariant,
	type Palette,
	type TypeOrValue
} from '@forewind/util';
import type { BaseSize, Rounded } from '$lib/types';
import { config } from '../_config';

const {
	rounded,
	shadow,
	common,
	colormap,
	fieldPaddingY,
	fontTransform,
	fieldRoundedPaddingX,
	fieldPaddingX,
	fontWeight,
	fieldTextSize
} = config;

const default_ring = pick(colormap.theme.default, 'ring_focus');
const defFilled = {
	...pick(colormap.theme.default, 'text', 'bg_glass', 'border_focus'),
	default_ring
};
const defOutline = {
	...pick(colormap.theme.default, 'text', 'border', 'border_focus'),
	default_ring
};
const defFlush = {
	...pick(colormap.theme.default, 'text', 'border', 'border_focus', 'bg_glass_focus'),
	default_ring
};

const filled = pickVariant(colormap.theme, 'bg_glass', 'text', 'ring_focus', 'border_focus');
const outline = pickVariant(colormap.theme, 'text', 'border', 'ring_focus', 'border_focus');
const flush = pickVariant(
	colormap.theme,
	'text',
	'border',
	'ring_focus',
	'border_focus',
	'bg_glass_focus'
);

const main = {
	base: classnames(
		'outline-none focus:ring-0 focus:outline-none inline-flex items-center text-sm border border-transparent justify-center',
		common.shadow,
		common.placeholder
	),
	rounded: { ...rounded },
	shadow: { ...shadow },
	transition: common.transition,
	ringed: common.ringed,
	full: 'w-full',
	active: common.active,
	addon: {
		both: 'pl-7 pr-12',
		left: 'pl-7',
		right: 'pr-12'
	},
	hovered: (
		variant: TypeOrValue<'filled' | 'outline' | 'flush'>,
		theme = 'default' as TypeOrValue<keyof Palette>
	) => {
		theme = theme || 'default';
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		if (variant === 'filled') return conf.hover_glass_highlight;
		else return conf.hover_glass;
	},
	transform: {
		...fontTransform
	},
	weight: {
		...fontWeight
	},
	size: mergeConfigs(
		{
			unstyled: '',
			xs: 'px-2',
			sm: 'px-2.5',
			md: 'px-3',
			lg: 'px-4',
			xl: 'px-5',
			'2xl': 'px-5'
		},
		fieldPaddingY,
		fieldPaddingX,
		fieldTextSize
	),
	roundedAdjust: (round: Rounded, size: BaseSize) => {
		return fieldRoundedPaddingX[round || 'unstyled'][size || 'unstyled'];
	},
	variant: {
		filled: {
			base: 'border-transparent focus:bg-transparent',
			default: defFilled,
			themes: {
				...filled
			}
		},
		outline: {
			base: 'bg-transparent focus:bg-transparent',
			default: defOutline,
			themes: {
				...outline
			}
		},
		flush: {
			base: 'bg-transparent border-t-0 border-l-0 border-r-0 border-b rounded-b-none',
			default: defFlush,
			themes: {
				...flush
			}
		}
	}
};

const input = { main };

export default input;
