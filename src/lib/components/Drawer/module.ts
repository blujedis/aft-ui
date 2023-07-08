import type { ThemeColor, ThemeShadowed, ThemeSimpleSize, ThemeSpeed } from '$lib/theme';
import type { SvelteComponent } from 'svelte';
import type { drawer } from './config';

export type DrawerVariant = keyof typeof drawer;

export type DrawerProps = {
	backdrop?: boolean;
	content?: typeof SvelteComponent<Record<string, unknown>>;
	contentProps?: Record<string, unknown>;
	position?: 'left' | 'right';
	shadowed?: ThemeShadowed;
	size?: ThemeSimpleSize;
	speed?: ThemeSpeed;
	theme?: ThemeColor;
	variant?: DrawerVariant;
};

export const drawerPositionMap = {
	left: 'left-0 pr-10',
	right: 'right-0 pl-10'
};

export const drawerSizeMap = {
	sm: 'max-w-xs',
	md: 'max-w-sm',
	lg: 'max-w-md'
};

export const drawerSpeedMap = {
	slow: 600,
	medium: 300,
	fast: 100
};

export const drawerOffsetMap = {
	sm: { left: -320, right: '100%' },
	md: { left: -384, right: '100%' },
	lg: { left: -448, right: '100%' }
} as Record<ThemeSimpleSize, { left: string | number; right: string | number }>;

export const drawerDefaults: Partial<DrawerProps> = {
	position: 'right',
	shadowed: 'lg',
	size: 'md',
	speed: 'medium',
	theme: 'default',
	variant: 'default'
};
