import type { ThemeSize } from '$lib/theme';
import type { IconProps as IconifyIconProps } from '@iconify/svelte';
// import IconBase from '@iconify/svelte';
// import { SvelteComponent } from 'svelte';

// export class Icon extends SvelteComponent<IconifyIconProps & { class?: string }> {
// 	constructor(props: any) {
// 		super(props);
// 		return new IconBase(props);
// 	}
// }

export type IconProps = IconifyIconProps & {
	class?: string;
	size?: ThemeSize;
	unstyled?: boolean;
};

export const iconDefaults = {
	size: 'md'
};
