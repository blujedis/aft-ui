/// <reference types="svelte" />
import { type Writable } from 'svelte/store';
export type ColorModeHook = ReturnType<typeof useColorMode>;
export declare function useColorMode(shouldInit?: boolean, prefers?: 'light' | 'dark'): Writable<boolean> & {
    getRoot: () => HTMLElement | null;
    getLocalValue: () => boolean | null;
    setLocalValue: (value: boolean) => void;
    set: (isDark?: boolean) => void;
    toggle: () => void;
    reset: () => void;
};
