import type { ThemeColor, ThemeShadowed, ThemeSize, ThemeSpeed } from '$lib/types';
import type { SvelteComponent } from 'svelte';

export type DrawerProps = {
	abortable?: boolean;
	backdrop?: boolean;
	escapable?: boolean;
	content?: typeof SvelteComponent<Record<string, unknown>>;
	contentProps?: Record<string, unknown>;
	position?: 'left' | 'right';
	shadowed?: ThemeShadowed;
	size?: ThemeSize;
	speed?: ThemeSpeed;
	theme?: ThemeColor;
};

export const drawerPositionMap = {
	left: 'left-0 pr-10',
	right: 'right-0 pl-10'
};

export const drawerSizeMap = {
	unstyled: '',
	none: 'max-w-none',
	xs: 'max-w-xs',
	sm: 'max-w-sm',
	md: 'max-w-md',
	lg: 'max-w-lg',
	xl: 'max-w-xl',
	xl2: 'max-w-2xl'
};

export const drawerSpeedMap = {
	slow: 600,
	medium: 300,
	fast: 100
};

export const drawerOffsetMap = {
	unstyled: {} as any,
	none: { left: 0, right: '100%' },
	xs: { left: -320, right: '100%' },
	sm: { left: -384, right: '100%' },
	md: { left: -448, right: '100%' },
	lg: { left: -512, right: '100%' },
	xl: { left: -576, right: '100%' },
	xl2: { left: -672, right: '100%' }
} as Record<ThemeSize, { left: string | number; right: string | number }>;

export const drawerDefaults: Partial<DrawerProps> = {
	abortable: true,
	escapable: true,
	position: 'right',
	shadowed: 'lg',
	size: 'sm',
	speed: 'medium',
	theme: 'default'
};
