import type { PopoverOptions } from '../../hooks/usePopover';
import type { AriaRole } from 'svelte/elements';
export type PopoverVariant = 'filled' | 'outlined' | 'soft';
export type PopoverProps<Tag> = Partial<Pick<PopoverOptions, 'events' | 'escapeable' | 'middleware' | 'offset' | 'padding' | 'placement' | 'strategy' | 'sticky'>> & {
    as?: Tag;
    role?: AriaRole | null | undefined;
    trigger?: string;
    onChange?: (state: boolean) => any;
};
export declare const popoverDefaults: Partial<PopoverProps<'div'>>;
