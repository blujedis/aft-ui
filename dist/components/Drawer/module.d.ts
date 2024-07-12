import type { ThemeColor, ThemeShadowed, ThemeSize, ThemeSpeed } from '../../types';
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
    unmount?: boolean;
    visible?: boolean | number;
};
export declare const drawerPositionMap: {
    left: string;
    right: string;
};
export declare const drawerSizeMap: {
    unstyled: string;
    none: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xl2: string;
};
export declare const drawerSpeedMap: {
    slow: number;
    medium: number;
    fast: number;
};
export declare const drawerOffsetMap: Record<ThemeSize, {
    left: string | number;
    right: string | number;
}>;
export declare const drawerDefaults: Partial<DrawerProps>;
