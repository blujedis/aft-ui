import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
import type { menuPanel } from './config';
export type MenuPanelVariant = keyof typeof menuPanel;
export type MenuPanelProps = {
    origin?: 'left' | 'right' | 'center';
    position?: 'left' | 'right';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: MenuPanelVariant;
};
export declare const menuPanelDefaults: {
    origin: string;
    position: string;
    shadowed: string;
    theme: string;
    transition: {
        start: number;
        type: string;
    };
    variant: string;
};
