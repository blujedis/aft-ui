import type { ThemeColor, ThemeSize } from '../../theme';
import type { ElementNativeProps } from '../../types/components';
import type { dropdownOptionGroup } from './config';
export type DropdownOptionGroupVariant = keyof typeof dropdownOptionGroup;
export type DropdownOptionGroupProps = ElementNativeProps<'a'> & {
    group?: string;
    size?: ThemeSize;
    theme?: ThemeColor;
    variant?: DropdownOptionGroupVariant;
};
export declare const dropdownOptionGroupDefaults: Partial<DropdownOptionGroupProps>;
