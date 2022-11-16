import { classnames, pick, pickVariant } from '@forewind/util';
import { config } from '../../_config';

const { colormap } = config;

const defTheme = pick(colormap.theme.default, 'text');
const themes = { ...pickVariant(colormap.theme, 'text') };

const main = {
	base: 'relative inline-flex',
	full: 'w-full',
	size: {
		none: '',
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-sm',
		lg: 'text-md',
		xl: 'text-lg',
		'2xl': 'text-xl'
	},
	variant: {
		default: {
			default: defTheme,
			themes
		}
	}
};

const icon = {
	base: 'flex pointer-events-none absolute inset-y-0 items-center',
	size: (type = 'left' as 'left' | 'right' | 'both', size = 'md' as keyof typeof main.size) => {
		return classnames(main.size[size], type === 'left' ? 'left-0 pl-3' : 'right-0 pr-3');
	},
	variant: main.variant
};

const inputAddon = { main, icon };

export default inputAddon;
