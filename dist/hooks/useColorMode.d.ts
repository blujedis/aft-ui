import { type Writable } from 'svelte/store';
export type ColorModeHook = ReturnType<typeof useColorMode>;
export interface UseColorModeOptions {
    key?: string;
}
export declare function useColorMode(key?: string): Writable<boolean> & {
    getRoot: () => any;
    getLocalValue: () => boolean;
    setLocalValue: (value: any) => void;
    enable: (mode: 'light' | 'dark') => void;
    toggle: () => void;
    reset: () => void;
};
