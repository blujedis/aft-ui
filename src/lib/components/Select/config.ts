import { variantOutlined, variantFilled, variantFlushed } from '../base';

const defaultSelect = {
	...variantOutlined
};

export const select = {
	default: {
		...defaultSelect
	},
	outlined: {
		...defaultSelect
	},
	filled: {
		...variantFilled
	},
	flushed: {
		...variantFlushed
	}
};
