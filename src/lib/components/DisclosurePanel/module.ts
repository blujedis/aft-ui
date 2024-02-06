import type { ElementProps, HTMLTag } from '$lib/types';

export type DisclosurePanelProps<T extends HTMLTag> = ElementProps<T> & {
	as?: T;
	unmount?: boolean;
};

export const disclosurePanelDefaults: DisclosurePanelProps<'div'> = {
	as: 'div',
	unmount: true
};
