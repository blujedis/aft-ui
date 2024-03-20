import type { ThemeColor, ThemeShadowed, ThemeSize } from '../../types';
export type SwitchProps = {
    position?: 'right' | 'left' | 'top' | 'bottom';
    classHandle?: string;
    classSlider?: string;
    disabled?: boolean;
    focused?: boolean;
    hovered?: boolean;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    srtext?: string;
    theme?: ThemeColor;
    transitioned?: boolean;
};
export declare const switchDefaults: Partial<SwitchProps>;
