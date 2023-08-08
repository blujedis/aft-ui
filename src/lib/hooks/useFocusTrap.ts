export const defaultFocusables = [
	'a[href]',
	'area[href]',
	'input:not([disabled])',
	'select:not([disabled])',
	'textarea:not([disabled])',
	'button:not([disabled])',
	'iframe',
	'object',
	'embed',
	'*[contenteditable]',
	'[tabindex]:not([tabindex="-1"])'
];

export type FocusTrapHook = (node: HTMLElement) => { destroy: () => void };
export type FocusTrapHandler = (event: KeyboardEvent) => void;
export type FocusTrapOptions = {
	enabled?: boolean;
	focusables?: string[];
	child?: string; //
};

export function useFocusTrap(enabled?: boolean): [FocusTrapHook, FocusTrapHandler];
export function useFocusTrap(options?: FocusTrapOptions): [FocusTrapHook, FocusTrapHandler];
export function useFocusTrap(enabledOrOptions?: boolean | FocusTrapOptions) {
	let options = enabledOrOptions as FocusTrapOptions;
	if (typeof enabledOrOptions === 'boolean') {
		options = {
			enabled: enabledOrOptions
		};
	}
	const { enabled, focusables, child } = {
		enabled: true,
		focusables: defaultFocusables,
		...options
	};

	let elements: HTMLElement[] = [];

	const isNext = (event: KeyboardEvent) => event.key === 'Tab' && !event.shiftKey;

	const isPrevious = (event: KeyboardEvent) => event.key === 'Tab' && event.shiftKey;

	const handleFocusTrap = (event: KeyboardEvent) => {
		if (event.target === window) return;

		const eventTarget = event.target as unknown as Element;

		const parentNode = elements.find((node) => {
			return node.contains(eventTarget);
		});

		if (!parentNode) return;

		const focusable: NodeListOf<HTMLElement> = parentNode.querySelectorAll(focusables.join(', '));

		const first = focusable[0];
		const last = focusable[focusable.length - 1];

		if (isNext(event) && event.target === last) {
			event.preventDefault();
			first.focus();
		} else if (isPrevious(event) && event.target === first) {
			event.preventDefault();
			last.focus();
		}
	};

	const bindFocusTrap = (initNode: HTMLElement) => {
		let node = initNode;
		if (child) {
			node = node.querySelector(child) as HTMLElement;
			console.log(node);
		}
		if (!node) console.warn(`UseFocusTrap cannot trap focus using node of null or undefined.`);
		if (!enabled || !node)
			return {
				// eslint-disable-next-line @typescript-eslint/no-empty-function
				destroy() {}
			};
		elements.push(node);
		return {
			destroy() {
				elements = elements.filter((element) => element !== node);
			}
		};
	};

	return [bindFocusTrap, handleFocusTrap] as [FocusTrapHook, FocusTrapHandler];
}
