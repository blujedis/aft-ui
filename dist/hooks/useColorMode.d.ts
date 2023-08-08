import { type Writable } from 'svelte/store';
export type ColorModeHook = ReturnType<typeof useColorMode>;
export interface UseColorModeOptions {
    key?: string;
}
export declare function useColorMode(key?: string): Writable<boolean> & {
    dark: boolean;
    getRoot: () => HTMLElement | null;
    getLocalValue: (key: string) => boolean;
    setLocalValue: (key: string, value: any) => void;
    enable: (mode: 'light' | 'dark') => void;
    toggle: () => void;
    reset: () => void;
};
