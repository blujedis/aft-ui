import type { ElementEvent } from '$lib/types';

export type CustomEventDetail<T = any> = Record<string, any> & { detail: T | null | undefined };

export type BeforeDispatchHandler<T = any> = <E extends HTMLElement>(
	e: ElementEvent<E>,
	node: HTMLElement
) => boolean | CustomEventDetail<T>;

export function createCustomEvent<T, K extends keyof DocumentEventMap>(
	event: K,
	name: string,
	beforeDispatch?: BeforeDispatchHandler<T>
) {
	const beforeDispatchHandler = beforeDispatch || ((e, n) => n && !e.preventDefault);
	return function initListener<E extends HTMLElement>(node: E) {
		const handle = (ev: Event) => {
			let response = beforeDispatchHandler(ev as ElementEvent<E>, node);
			if (response) {
				if (response === true) response = { detail: null };
				node.dispatchEvent(new CustomEvent(name, response));
			}
		};
		document.addEventListener(event, handle, true);
		return {
			destroy() {
				document.removeEventListener(event, handle, true);
			}
		};
	};
}
