import { SvelteComponent } from 'svelte';
import { disclosureTransitions } from '../Disclosure';
export class ModalComponent extends SvelteComponent {
    disclosure;
}
export const modalTransitions = {
    ...disclosureTransitions,
    zoom: { duration: 200, start: 0.925, type: 'scale' },
    swipe: { duration: 200, axis: 'y', type: 'slide' },
    dissolve: { duration: 200, start: 0.8, type: 'fade' }
};
export const modalDefaults = {
    backdrop: true,
    labelby: 'Modal',
    rounded: 'md',
    shadowed: 'lg',
    theme: 'frame',
    unmount: true
};
