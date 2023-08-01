import { variantOutlined, variantFilled, variantFlushed } from '../../constants/base';

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
