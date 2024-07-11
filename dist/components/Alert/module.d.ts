import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { IconifyIcon } from '@iconify/svelte';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
export type AlertVariant = 'filled' | 'outlined' | 'soft';
export type AlertTransition = DisclosureTransitionOption;
export type AlertProps = {
    removable?: boolean;
    escapable?: boolean;
    focustrap?: boolean;
    full?: boolean;
    icon?: boolean | string | IconifyIcon;
    position?: 'top' | 'bottom' | 'unstyled';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transition?: AlertTransition | (Record<string, any> & {
        type: DisclosureTransition;
    });
    unmount?: boolean;
    variant?: AlertVariant;
    visible?: boolean | number | Date | string;
};
export declare const alertDefaults: Partial<AlertProps>;
export declare const alertIcons: {
    frame: string;
    primary: string;
    secondary: string;
    tertiary: string;
    danger: string;
    warning: string;
    info: string;
    success: string;
    white: string;
    black: string;
    unstyled: string;
};
