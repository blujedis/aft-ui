import { config } from '../_config';
import type { BaseSize } from '$lib/types';
import { pickVariant, pick, classnames } from '@forewind/util';

const { shadow, rounded, common, colormap } = config;

const defProps = pick(colormap.theme.default, 'bg_range');
const themes = pickVariant(colormap.theme);

const main = {
	base: classnames(
		'focus:ring-0 focus:outline-none focus:ring-0 focus:ring-offset-0 w-full',
		defProps
	),
	rounded: (size: BaseSize) => {
		return {
			unstyled: '',
			xs: rounded.lg,
			sm: rounded.lg,
			md: rounded.lg,
			lg: rounded.lg,
			xl: rounded.lg,
			'2xl': rounded.xl
		}[size];
	},
	shadow: { ...shadow },
	transition: 'duration-100 ease-in transition-[background-size]',
	active: common.active,
	size: {
		xs: 'h-1 thumb-xs',
		sm: 'h-1.5 thumb-sm',
		md: 'h-2 thumb-md',
		lg: 'h-3 thumb-lg',
		xl: 'h-4 thumb-xl',
		'2xl': 'h-5 thumb-2xl'
	},
	hovered: 'hover:saturate-200',
	variant: {
		default: {
			base: '',
			default: '',
			themes: {
				...themes
			}
		}
	}
};

const slider = { main };

export default slider;
