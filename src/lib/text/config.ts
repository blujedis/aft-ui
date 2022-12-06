import { config } from '../_config';
import { concat, pick, pickVariant } from '@forewind/util';
import { font_size } from '$lib/_config/config';
const { font_weight, dropshadow, font_transform, colormap, common } = config;

const themes = pickVariant(colormap.theme, 'text');
themes.default = pick(colormap.theme.default, 'text');

const main = {
	base: concat(`bg-transparent inline-flex relative items-center align-middle`, common.shadow),
	dropshadow: { 
		...dropshadow 
	},
	weight: {
		...font_weight
	},
	transform: {
		...font_transform
	},
	size: {
		...font_size
	},
	as: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'label', 'blockquote', 'p', 'abbr', 'cite', 'i', 'kbd', 'q', 's', 'small', 'strong', 'sup', 'sub', 'time', 'u', 'var', 'samp', 'mark', 'em', 'b', '' ] as const,
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
