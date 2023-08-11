import { solid, variantFilled } from '$lib/constants';

export const popover = {
	filled: {
		...variantFilled,
		$base: 'text-white',
		light: 'text-[color:var(--text-dark)]',
		white: 'text-[color:var(--text-dark)]'
	}
};
