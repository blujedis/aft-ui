import {
	variantOutlinedHover,
	variantFilledHover,
	variantFlushed,
	variantGlass
} from '$lib/constants';
import { mergeConfigs } from '$lib/theme';

export const select = {
	outlined: mergeConfigs(variantOutlinedHover, {
		$base: 'border-0'
	}),
	filled: mergeConfigs(variantFilledHover, {
		$base: ''
	}),
	flushed: mergeConfigs(variantFlushed, {
		$base: 'px-2 peer focus:ring-0 outline-none border-0'
	}),
	glass: mergeConfigs(variantGlass, {
		white: 'dark:text-[color:var(--text-dark)]',
		light: 'dark:text-[color:var(--text-dark)]'
	})
};
