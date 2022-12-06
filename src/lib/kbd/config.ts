import { config } from '../_config';
import { pickVariant, pick, classnames } from '@forewind/util';

const { shadow, rounded, common, colormap } = config;

// const defFilled = pick(colormap.theme.default, 'bg', 'text');
// const defOutline = pick(colormap.theme.default, 'text', 'border');

const filled = pickVariant(colormap.theme, 'bg');
const outline = pickVariant(colormap.theme, 'text', 'border');

filled.default = pick(colormap.theme.default, 'bg', 'text');
outline.default = pick(colormap.theme.default, 'text', 'border');

const main = {
	base: classnames('inline-flex items-center text-sm border px-1', common.shadow),
	rounded: { ...rounded },
	shadow: { ...shadow },
	size: {
		xs: 'px-1 text-[10px]',
		sm: 'px-1 text-xs',
		md: 'px-1 text-sm',
		lg: 'px-1 text-md',
		xl: 'px-1 text-lg',
		'2xl': 'px-1 text-xl'
	},
	variant: {
		filled: {
			base: 'border-transparent text-white',
			// default: defFilled,
			themes: {
				...filled
			}
		},
		outline: {
			base: 'bg-transparent',
			// default: defOutline,
			themes: {
				...outline
			}
		}
	}
};

const kbd = { main };

export default kbd;
