import type { ThemeSize } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { IconProps } from '../Icon';
export type LoaderProps = Omit<IconProps, 'icon'> & {
    position?: 'left' | 'right';
    visible?: boolean;
    size?: ThemeSize;
    icon?: string | IconifyIcon;
};
export declare const loaderDefaults: Partial<LoaderProps>;
