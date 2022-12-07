import { config } from '../app/config';
import { concat, pick, pickVariant } from '@forewind/util';
const { font_weight: fontWeight, dropshadow, font_transform: fontTransform, colormap, common } = config;

const themes = pickVariant(colormap.theme, 'text');
themes.default = pick(colormap.theme.default, 'text');

const main = {
	base: concat(`bg-transparent inline-flex relative items-center align-middle`, common.shadow),
	dropshadow: { ...dropshadow },
	weight: {
		...fontWeight
	},
	transform: {
		...fontTransform
	},
	size: {
		unstyled: '',
		base: 'text-base',
		xs: 'text-xs',
		sm: 'text-sm',
		md: 'text-md',
		lg: 'text-lg',
		xl: 'text-xl',
		'2xl': 'text-2xl'
	},
	variant: {
		default: {
			base: '',
			// default: pick(colormap.theme.default, 'text'),
			themes: {
				...themes
			}
		}
	}
};

const label = { main };

export default label;
