import { variantFilled, variantOutlined, variantFlushed } from '../base';

const baseVariant = {
	...variantOutlined
};

export const input = {
	default: {
		...baseVariant
	},
	outlined: {
		...baseVariant
	},
	filled: {
		...variantFilled
	},
	flushed: {
		...variantFlushed
	}
};
