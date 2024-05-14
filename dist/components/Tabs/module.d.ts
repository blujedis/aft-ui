/// <reference types="svelte" />
import type { SelectStoreValue } from '../../stores/select';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
import { type Writable } from 'svelte/store';
import type { TabVariant } from '../Tab';
export type TabsProps = {
    condensed?: boolean;
    focused?: boolean;
    hovered?: boolean;
    full?: boolean;
    rounded?: ThemeRounded;
    selected: SelectStoreValue;
    shadowed?: ThemeShadowed;
    size?: ThemeSize;
    theme?: ThemeColor;
    transitioned?: boolean;
    variant?: TabVariant;
    underlined?: boolean;
    navWrapperClasses?: string;
    navContainerClasses?: string;
    navClasses?: string;
};
export type TabsStore = {
    tabs: (HTMLElement & {
        $select: () => any;
    })[];
    selected?: HTMLElement;
    currentIndex: number;
};
export type TabsContext = Writable<TabsStore> & {
    globals: {
        focused?: boolean;
        hovered: boolean;
        full: boolean;
        rounded: ThemeRounded;
        size: ThemeSize;
        theme: ThemeColor;
        transitioned: boolean;
        variant: TabVariant;
        underlined: boolean;
    };
};
export declare const tabsDefaults: Partial<TabsProps>;
