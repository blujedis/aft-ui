import type { ThemeColor, ThemeSize } from '../../types';
import type { IconProps as IconifyIconProps } from '@iconify/svelte';
export type IconProps = IconifyIconProps & {
    class?: string;
    size?: ThemeSize;
    theme?: ThemeColor;
    unstyled?: boolean;
};
export declare const iconDefaults: {
    size: string;
};
