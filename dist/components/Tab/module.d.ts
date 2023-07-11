import type { ThemeColor, ThemeFocused, ThemeRounded, ThemeSize, ThemeTransitioned } from '../../theme';
import type { tab } from './config';
export type TabVariant = keyof typeof tab;
export type TabProps<Tag = 'a'> = {
    as: Tag;
    disabled?: boolean;
    focused?: ThemeFocused;
    full?: boolean;
    rounded?: ThemeRounded;
    size?: ThemeSize;
    transitioned?: ThemeTransitioned;
    theme?: ThemeColor;
    value: string | number;
    variant?: TabVariant;
    underlined?: boolean;
};
export declare const tabDefaults: Partial<TabProps<any>>;
