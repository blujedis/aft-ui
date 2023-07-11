import { cubicOut } from 'svelte/easing';
export const progressBarDefaults = {
    animate: true,
    duration: 400,
    easing: cubicOut,
    max: 100,
    size: 'md',
    theme: 'default',
    value: 0,
    variant: 'default'
};
