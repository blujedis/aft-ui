import { createEventDispatcher } from 'svelte';
import type { DispatchOptions } from 'svelte/internal';

export type DispatchHandler<T = any> = <K extends Extract<keyof T, string>>(
	type: K,
	detail?: T[K],
	options?: DispatchOptions
) => boolean;

export type EventRemap<K extends string, T extends Record<string, any>> = {
	[P in keyof T as `${K}${Capitalize<Extract<keyof T, string>>}`]: T[keyof T];
};

export function createDispatcher<
	K extends string,
	T extends Record<string, unknown> = Record<string, unknown>
>(name: K, map = {} as T): DispatchHandler<EventRemap<K, T>> & { $name: string } {
	const dispatcher = createEventDispatcher() as any;
	dispatcher.$name = name;
	return dispatcher;
}
