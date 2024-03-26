import type { PopoverEvent, PopoverOptions } from '$lib/hooks/usePopover';
import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '$lib/types';
import type { AriaRole } from 'svelte/elements';

export type TooltipVariant = 'filled' | 'outlined' | 'soft';

export type TooltipProps<Tag> = &
	Pick<PopoverOptions, 'events' | 'escapeable' | 'middleware' | 'offset' | 'padding' | 'placement' | 'strategy' | 'sticky'> & {
		arrowed?: boolean;
		as?: Tag;
		escapeable?: boolean;
		events?: PopoverEvent | PopoverEvent[];
		role?: AriaRole | null | undefined;
		rounded?: ThemeRounded;
		shadowed?: ThemeShadowed;
		size?: ThemeSize;
		theme?: ThemeColor;
		transitioned?: boolean;
		trigger?: string;
		variant?: TooltipVariant;
		onChange?: (state: boolean) => any;
	};

export const tooltipDefaults: Partial<TooltipProps<'div'>> = {
	arrowed: true,
	as: 'div',
	escapeable: true,
	events: ['hover', 'focus'],
	role: 'tooltip',
	size: 'md',
	theme: 'frame',
	variant: 'filled',
};
