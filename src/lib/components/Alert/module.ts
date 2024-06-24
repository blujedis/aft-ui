import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { IconifyIcon } from '@iconify/svelte';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';

export type AlertVariant = 'filled' | 'outlined' | 'soft';

export type AlertTransition = DisclosureTransitionOption;

export type AlertProps = {
	removable?: boolean; // when true can escape or click background to abort.
	escapable?: boolean;
	focustrap?: boolean;
	full?: boolean;
	icon?: boolean | string | IconifyIcon;
	position?: 'top' | 'bottom' | 'unstyled';
	rounded?: ThemeRounded;
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	theme?: ThemeColor;
	transition?: AlertTransition | (Record<string, any> & { type: DisclosureTransition });
	unmount?: boolean;
	variant?: AlertVariant;
	visible?: boolean | number | Date | string;
};

export const alertDefaults: Partial<AlertProps> = {
	escapable: true,
	focustrap: true,
	full: true,
	position: 'unstyled',
	removable: true,
	size: 'md',
	theme: 'primary',
	transition: 'none',
	unmount: true,
	variant: 'soft',
	visible: false
};

export const alertIcons = {
	frame: '',
	primary: '',
	secondary: '',
	tertiary: '',
	danger: 'mdi:dangerous',
	warning: 'mdi:alert-outline',
	info: 'mdi:information-outline',
	success: 'mdi:check',
	white: '',
	black: '',
	unstyled: ''
};
