export type ConditionalElementProps<Tag> = {
	events?: boolean; // when true fwd events for container.
	as?: Tag;
	condition: boolean | ((...args: any[]) => boolean);
};

export const conditionalElementDefaults: Partial<ConditionalElementProps<'div'>> = {
	as: 'div'
};
