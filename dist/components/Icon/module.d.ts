import type { ThemeColor, ThemeSize } from '../../types';
import type { IconProps as IconifyIconProps } from '@iconify/svelte';
export type IconProps = IconifyIconProps & {
    class?: string;
    hovered?: boolean;
    size?: ThemeSize;
    theme?: ThemeColor | 'white' | 'black';
    stroke?: boolean;
    transitioned?: boolean;
};
export declare const iconDefaults: {
    size: string;
    theme: string;
};
