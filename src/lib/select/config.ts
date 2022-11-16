import { config } from '../_config';
import type { BaseSize, Rounded } from '$lib/types';
import {
	classnames,
	concat,
	mergeConfigs,
	pick,
	pickVariant,
	type Palette,
	type TypeOrValue
} from '@forewind/util';

const {
	rounded,
	shadow,
	common,
	colormap,
	fieldPaddingY,
	fieldRoundedPaddingX,
	fieldPaddingX,
	fieldTextSize,
	fontTransform,
	fontWeight
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
		'focus:ring-0 inline-flex items-center justify-center focus:outline-none text-sm border border-transparent focus:bg-transparent dark:focus:bg-transparent focus:ring-0',
		common.placeholder
	),
	rounded: { ...rounded },
	shadow: { ...shadow },
	transition: common.transition,
	ringed: common.ringed,
	active: common.active,
	full: 'w-full',
	transform: {
		...fontTransform
	},
	weight: {
		...fontWeight
	},
	hovered: (
		variant: TypeOrValue<'filled' | 'outline' | 'flush'>,
		theme = 'default' as TypeOrValue<keyof Palette>
	) => {
		const conf = colormap.theme[theme as keyof typeof colormap.theme];
		if (variant === 'filled') return conf.hover_glass_highlight;
		else return conf.hover_glass;
	},
	size: mergeConfigs(
		{
			none: '',
			xs: 'px-2 pr-8',
			sm: 'px-2.5 pr-8',
			md: 'px-3 pr-8',
			lg: 'px-3.5 pr-8',
			xl: 'px-5 pr-8',
			'2xl': 'px-5 pr-8'
		},
		fieldPaddingY,
		fieldPaddingX,
		fieldTextSize
	),
	roundedAdjust: (round: Rounded, size: BaseSize) => {
		const pr = ['xl', '2xl'].includes(size as string) ? 'pr-12' : 'pr-10';
		return concat(fieldRoundedPaddingX[round || 'unstyled'][size || 'unstyled'], pr);
	},
	variant: {
		filled: {
			base: 'border-transparent',
			default: defFilled,
			themes: {
				...filled
			}
		},
		outline: {
			base: 'bg-transparent',
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

const select = { main };

export default select;
