import { config } from '../_config';
import { concat, pick, pickVariant } from '@forewind/util';

const { shadow, common, colormap, fontTransform, fontWeight, fieldTextSize } = config;

const default_ring = pick(colormap.theme.default, 'ring_focus');
const themes = pickVariant(colormap.theme, 'ring', 'ring_focus_peer', 'checked_peer');

const main = {
	base: concat(
		'peer-focus:ring-0 after:border-2 translate-x-0 after:transition-all rounded-full after:absolute after:rounded-full after:content-[""] m-1 bg-gray-200 peer-checked:bg-gray-500 after:bg-white after:border-gray-300 dark:after:border-gray-500',
		common.shadow
	),
	shadow: { ...shadow },
	ringed: common.ringedPeer,
	active: common.active,
	position: {
		top: 'flex-col-reverse', // { label: 'flex-col-reverse', text: 'mb-2' },
		right: '', // { label: '', text: 'ml-2' },
		bottom: 'flex-col', // { label: 'flex-col', text: 'mt-2' },
		left: 'flex-row-reverse' // { label: 'flex-row-reverse', text: 'mr-2' },
	},
	transform: {
		...fontTransform
	},
	weight: {
		...fontWeight
	},
	size: {
		xs: 'w-5 h-2 after:h-3 after:w-3 after:-top-0.5 peer-checked:after:translate-x-3 after:left-[-2px]',
		sm: 'w-7 h-3 after:h-4 after:w-4 after:-top-0.5 peer-checked:after:translate-x-4 after:left-[-2px]',
		md: 'w-9 h-4 after:h-5 after:w-5 after:-top-0.5 peer-checked:after:translate-x-5 after:left-[-2px]',
		lg: 'w-11 h-5 after:h-6 after:w-6 after:-top-0.5 peer-checked:after:translate-x-6 after:left-[-2px]',
		xl: 'w-14 h-6 after:h-7 after:w-7 after:-top-0.5 peer-checked:after:translate-x-7 after:left-[-0px]',
		'2xl':
			'w-16 h-7 after:h-8 after:w-8 after:-top-0.5 peer-checked:after:translate-x-8 after:left-[-0px]'
	},
	variant: {
		default: {
			base: '',
			default: default_ring,
			themes: {
				...themes
			}
		}
	}
};

const wrapper = {
	base: 'inline-flex relative items-center align-middle cursor-pointer noflicker',
	position: main.position
};

const text = {
	base: '',
	transform: main.transform,
	weight: main.weight,
	position: {
		top: 'mb-2',
		right: 'ml-2',
		bottom: 'mt-2',
		left: 'mr-2'
	},
	size: fieldTextSize
};

const switcher = { main, wrapper, text };

export default switcher;
