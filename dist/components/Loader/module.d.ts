import type { ThemeSize } from '../../theme';
import type { IconifyIcon } from '@iconify/svelte';
import type { IconProps } from '../Icon';
export type LoaderProps = Omit<IconProps, 'icon'> & {
    visible?: boolean;
    size?: ThemeSize;
    icon?: string | IconifyIcon;
};
export declare const loaderDefaults: Partial<LoaderProps>;
