import type { SelectStore, SelectStoreValue } from '../../stores/select';
import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize } from '../../types';
import type { ButtonProps } from '../Button/module';
import type { ButtonGroupVariant } from '../ButtonGroupItem';
export type ButtonGroupProps = Omit<ButtonProps<'button' | 'a'>, 'disabled' | 'variant'> & {
    multiple?: boolean;
    value?: SelectStoreValue;
    variant?: ButtonGroupVariant;
};
export type ButtonGroupContext = SelectStore & {
    globals: {
        focused: ThemeFocused;
        full: boolean;
        hovered: boolean;
        rounded: ThemeRounded;
        size: ThemeSize;
        theme: ThemeColor;
        transitioned: boolean;
        variant: ButtonGroupVariant;
    };
};
export declare const buttonGroupDefaults: Partial<ButtonGroupProps>;
