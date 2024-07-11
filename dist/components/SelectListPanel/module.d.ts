import type { ThemeColor, ThemeRounded, ThemeShadowed } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure';
export type SelectListPanelProps = {
    bordered?: boolean;
    full?: boolean;
    tags?: boolean;
    recordless?: boolean;
    position?: 'left' | 'right';
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
};
export declare const selectListPanelDefaults: SelectListPanelProps;
