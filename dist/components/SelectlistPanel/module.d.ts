import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
import type { multiselectPanel } from './config';
export type MultiselectPanelVariant = keyof typeof multiselectPanel;
export type MultiselectPanelProps = {
    origin?: 'left' | 'right' | 'center';
    position?: 'left' | 'right';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: MultiselectPanelVariant;
};
export declare const multiselectPanelDefaults: {
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
