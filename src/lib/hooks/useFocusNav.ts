type FindHandler<T extends HTMLElement> = (items: T[], e: KeyboardEvent) => T;
type SelectedHandler<T extends HTMLElement> = (el: T, e: KeyboardEvent) => any;
type InitHandler<T extends HTMLElement> = (items: T[]) => void;
type NavigateHandler<T extends HTMLElement> = (item: T | undefined, index: number) => any;

export interface FocusNavOptions<T extends HTMLElement> {
	selectedClass?: string;
	allowedClass?: string;
	onFind?: FindHandler<T>;
	onSelected?: SelectedHandler<T>;
	onNavigate?: NavigateHandler<T>;
	onInit?: InitHandler<T>;
}

const defaults = {
	onFind: <T>(_items: T[]) => null as T | null | undefined,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onSelected: <T>(_node: T) => { },
	onInit: <T>(_items: T[]) => { },
	onNavigate: <T>(_item: T, _index: number) => { }
};

export function useFocusNav<T extends HTMLElement>(
	root?: HTMLElement | ChildNode | null,
	options?: FocusNavOptions<T>
) {
	const _options = {
		...defaults,
		...options
	} as Required<FocusNavOptions<T>>;

	function getItems() {
		if (!root) return [] as T[];
		return (Array.from((root as HTMLElement).children) || []) as T[];
	}

	function focusRoot() {
		if (root) (root as HTMLElement).focus();
	}

	function onKeydown(e: KeyboardEvent, preventDefault = false) {
		if (e.repeat || !['ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(e.key)) return;

		const items = getItems();
		if (!items?.length || !root) return; // nothing to do aren't any option items.

		const activeNode = document.activeElement as T;

		//////////////////////////////////////////////
		// User is selecting current value.
		//////////////////////////////////////////////

		if ((e.key === ' ' || e.key === 'Enter') && (root as HTMLElement).contains(activeNode)) {
			if (preventDefault) e.preventDefault();
			_options.onSelected(activeNode, e);
		}

		//////////////////////////////////////////////
		// User is navigating options.
		//////////////////////////////////////////////
		else {
			let currentNode: HTMLElement | undefined;
			e.preventDefault(); // otherwise overflow will cause scroll jumping.

			if (root.contains(activeNode)) {
				// already navigating child nodes.
				const currentIndex = items.indexOf(activeNode);
				const nextIndex = e.key === 'ArrowDown' ? currentIndex + 1 : currentIndex - 1;
				// Nothing to do is a repeat key or out of scope.
				if (nextIndex < 0 || nextIndex > items.length - 1) return;
				// Otherwise set the current node to the new index.
				currentNode = items[nextIndex];
				_options.onNavigate(currentNode as T, Math.max(0, nextIndex - 1));
			} else {
				// dropdown expanded start at first or selected node.
				currentNode = _options.onFind(items, e);
				_options.onNavigate(currentNode as T, 0);
			}
			if (currentNode) currentNode.focus();
		}
	}

	_options.onInit(getItems());

	return {
		getItems,
		focusRoot,
		onKeydown
	};
}
