import type { PopoverOptions } from '$lib/hooks/usePopover';
import type { AriaRole } from 'svelte/elements';

export type PopoverVariant = 'filled' | 'outlined' | 'soft';

export type PopoverProps<Tag> = Partial<
	Pick<
		PopoverOptions,
		| 'events'
		| 'escapeable'
		| 'middleware'
		| 'offset'
		| 'padding'
		| 'placement'
		| 'strategy'
		| 'sticky'
	>
> & {
	as?: Tag;
	role?: AriaRole | null | undefined;
	trigger?: string;
	onChange?: (state: boolean) => any;
};

export const popoverDefaults: Partial<PopoverProps<'div'>> = {
	as: 'div',
	escapeable: true,
	events: ['hover', 'focus'],
	role: 'tooltip'
};
