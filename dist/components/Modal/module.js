import { SvelteComponent } from 'svelte';
export class ModalComponent extends SvelteComponent {
    disclosure;
}
export const transitions = {
    fade: { duration: 200, start: 0.5 },
    zoom: { duration: 200, start: 0.95 },
    announce: { duration: 400, y: -600 },
    reveal: { duration: 400, y: 600 },
    none: { duration: 0 }
};
export const modalDefaults = {
    backdrop: true,
    labelby: 'Modal',
    rounded: 'md',
    shadowed: 'lg',
    theme: 'default',
    variant: 'default',
    unmount: true
};
