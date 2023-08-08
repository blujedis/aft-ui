import { cubicOut } from 'svelte/easing';
export const progressBarDefaults = {
    animate: true,
    duration: 400,
    easing: cubicOut,
    max: 100,
    size: 'md',
    theme: 'light',
    value: 0,
    variant: 'filled'
};
