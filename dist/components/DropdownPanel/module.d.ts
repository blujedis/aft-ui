import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { dropdownPanel } from './config';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
export type DropdownPanelVariant = keyof typeof dropdownPanel;
export type DropdownPanelProps = {
    origin?: 'left' | 'right' | 'center';
    position?: 'left' | 'right';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: DropdownPanelVariant;
    visible?: boolean;
    unmount?: boolean;
    width?: string;
};
export declare const dropdownPanelDefaults: Partial<DropdownPanelProps>;
