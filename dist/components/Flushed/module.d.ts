import type { ThemeColor, ThemeFocused } from '../../types';
export type FlushedProps = {
    disabled?: boolean;
    focused?: ThemeFocused;
    group?: boolean;
    peer?: boolean;
    hovered?: boolean;
    selected?: boolean;
    theme?: ThemeColor;
};
export declare const flushedDefaults: Partial<FlushedProps>;
