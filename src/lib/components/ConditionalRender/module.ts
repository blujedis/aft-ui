

export type ConditionalRenderProps = {
	condition: boolean | ((...args: any[]) => boolean);
};

export const conditionalRenderDefaults: Partial<ConditionalRenderProps> = {
};
