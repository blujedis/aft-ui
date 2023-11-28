import {
	variantFilled,
	variantGhost,
	variantOutlined,
	variantFlushed
} from '$lib/constants/variants';

export const select = {
	flushed: { ...variantFlushed },
	filled: { ...variantFilled },
	outlined: { ...variantOutlined },
	ghost: { ...variantGhost }
};
