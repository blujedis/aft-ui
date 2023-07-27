import { cubicOut } from 'svelte/easing';
export const progressCircleDefaults = {
    animate: true,
    duration: 400,
    easing: cubicOut,
    max: 100,
    size: 'md',
    text: true,
    textunit: '%',
    theme: 'frame',
    value: 0,
    variant: 'default'
};
