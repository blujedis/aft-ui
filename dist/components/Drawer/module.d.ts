import type { ThemeColor, ThemeShadowed, ThemeSimpleSize, ThemeSpeed } from '../../types';
import type { SvelteComponent } from 'svelte';
export type DrawerVariant = 'default';
export type DrawerProps = {
    abortable?: boolean;
    backdrop?: boolean;
    escapable?: boolean;
    content?: typeof SvelteComponent<Record<string, unknown>>;
    contentProps?: Record<string, unknown>;
    position?: 'left' | 'right';
    shadowed?: ThemeShadowed;
    size?: ThemeSimpleSize;
    speed?: ThemeSpeed;
    theme?: ThemeColor;
    variant?: DrawerVariant;
};
export declare const drawerPositionMap: {
    left: string;
    right: string;
};
export declare const drawerSizeMap: {
    sm: string;
    md: string;
    lg: string;
};
export declare const drawerSpeedMap: {
    slow: number;
    medium: number;
    fast: number;
};
export declare const drawerOffsetMap: Record<ThemeSimpleSize, {
    left: string | number;
    right: string | number;
}>;
export declare const drawerDefaults: Partial<DrawerProps>;
