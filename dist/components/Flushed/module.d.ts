import type { ThemeColor, ThemeFocused } from '../../types';
export type FlushedProps = {
    disabled?: boolean;
    focused?: ThemeFocused;
    group?: boolean;
    peer?: boolean;
    hover?: boolean;
    active?: boolean;
    theme?: ThemeColor;
};
export declare const flushedDefaults: Partial<FlushedProps>;
