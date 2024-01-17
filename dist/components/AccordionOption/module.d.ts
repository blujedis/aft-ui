import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import type { DisclosureTransition, DisclosureTransitionOption } from '../Disclosure/module';
export type AccordionOptionContext = {
    key: SelectStoreValue;
};
export type AccordianOptionProps<Tag = any> = {
    as?: Tag;
    unflip?: boolean;
    key: SelectStoreValue;
    rounded?: ThemeRounded;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transition?: DisclosureTransitionOption | (Record<string, any> & {
        type: DisclosureTransition;
    });
};
export declare const accordionOptionDefaults: Partial<AccordianOptionProps<'div'>>;
