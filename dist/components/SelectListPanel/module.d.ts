import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
import type { SelectListVariant } from '../SelectListButton';
export type SelectListPanelProps = {
    origin?: 'left' | 'right' | 'center';
    position?: 'left' | 'right';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
    variant?: SelectListVariant;
};
export declare const selectListPanelDefaults: {
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
