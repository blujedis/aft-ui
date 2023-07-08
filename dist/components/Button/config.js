import { variantFilled, variantOutlined, variantText, variantGhost } from '../base';
export const button = {
	default: {
		...variantFilled,
		$base: 'text-white border border-transparent'
	},
	filled: {
		...variantFilled,
		$base: 'text-white border border-transparent'
	},
	outlined: {
		...variantOutlined,
		$base: 'text-inherit hover:text-inherit bg-transparent border'
	},
	text: {
		...variantText,
		$base: 'text-inherit hover:text-inherit border-none bg-transparent'
	},
	ghost: {
		...variantGhost,
		$base: 'text-inherit hover:text-inherit border border-transparent bg-transparent'
	}
};
