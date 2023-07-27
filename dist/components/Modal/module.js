import { SvelteComponent } from 'svelte';
import { disclosureTransitions } from '../Disclosure';
export class ModalComponent extends SvelteComponent {
    disclosure;
}
export const transitions = {
    ...disclosureTransitions,
    zoom: { duration: 200, start: 0.925, type: 'scale' },
    swipe: { duration: 200, axis: 'y', type: 'slide' },
    dissolve: { duration: 200, start: 0.8, type: 'fade' }
    // fade: { duration: 200, start: 0.5 },
    // zoom: { duration: 200, start: 0.925 },
    // announce: { duration: 400, y: -300 },
    // reveal: { duration: 400, y: 300 },
    // none: { duration: 0 }
};
export const modalDefaults = {
    backdrop: true,
    labelby: 'Modal',
    rounded: 'md',
    shadowed: 'lg',
    theme: 'frame',
    variant: 'default',
    unmount: true
};
