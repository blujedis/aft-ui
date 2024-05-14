import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
export type MenuPanelProps = {
    full?: boolean;
    bordered?: boolean;
    position?: 'left' | 'right';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
};
export declare const menuPanelDefaults: {
    bordered: boolean;
    position: string;
    shadowed: string;
    theme: string;
    transition: {
        start: number;
        type: string;
    };
};
