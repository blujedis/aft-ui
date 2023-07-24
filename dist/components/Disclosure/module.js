import { fly, fade, scale, blur, slide } from 'svelte/transition';
export const disclosureDefaults = {
    as: 'div',
    autoclose: true,
    opened: false,
    escapable: true
};
export const disclosureTransitions = {
    fly,
    fade,
    scale,
    blur,
    slide
};
export const disclosureTransitionOptions = {
    none: { duration: 0 },
    disolve: { duration: 200, start: 0.5, type: 'fade' },
    focus: { duration: 400, amount: 5, opacity: 0, type: 'blur' },
    expand: { duration: 400, axis: 'y', type: 'slide' },
    swipe: { duration: 400, axis: 'x', type: 'slide' },
    zoom: { duration: 200, start: 0.7, type: 'scale' },
    announce: { duration: 400, y: -300, type: 'fly' },
    reveal: { duration: 400, y: 300, type: 'fly' }
};
export function transitioner(node, options) {
    if (!options)
        return null;
    let config = options;
    if (typeof options === 'string')
        config = disclosureTransitionOptions[options];
    else
        config = options;
    const { type, ...rest } = config;
    return disclosureTransitions[type](node, rest);
}
