import type { ThemeColor, ThemeFocused, ThemeSize } from '../../theme';
import type { DropdownKey } from '../Dropdown/module';
import type { dropdownOption } from './config';
export type DropdownOptionVariant = keyof typeof dropdownOption;
export type DropdownOptionProps<Tag extends 'a' | 'button'> = {
    element?: Tag;
    focused?: ThemeFocused;
    label?: string;
    size?: ThemeSize;
    theme?: ThemeColor;
    value?: DropdownKey;
    variant?: DropdownOptionVariant;
};
export declare const dropdownOptionDefaults: Partial<DropdownOptionProps<'button'>>;
