export type ResizerDirection =
	| 'north'
	| 'south'
	| 'east'
	| 'west'
	| 'northwest'
	| 'northeast'
	| 'southwest'
	| 'southeast';

export type ResizerElement = HTMLElement & { $direction: ResizerDirection };

export interface ResizerHandles {
	top?: boolean;
	right?: boolean;
	bottom?: boolean;
	left?: boolean;
	topLeft?: boolean;
	topRight?: boolean;
	bottomLeft?: boolean;
	bottomRight?: boolean;
}

export interface ResizerRectangle {
	width: number;
	height: number;
	top: number;
	right: number;
	bottom: number;
	left: number;

	newWidth?: number;
	newHeight?: number;
	newTop?: number;
	newRight?: number;
	newBottom?: number;
	newLeft?: number;
}

export interface ResizerPosition {
	x: number;
	y: number;
}

export interface ResizerOptions {
	classname?: string;
	handles?: ResizerHandles;
	onResizing?: (values: ResizerPosition & ResizerRectangle) => any;
	onResized?: (values: ResizerPosition & ResizerRectangle) => any;
	onDestroy?: () => any;
	debug?: boolean;
}

const classMap = {
	top: 'top',
	right: 'right',
	bottom: 'bottom',
	left: 'left',
	topLeft: 'top-left',
	topRight: 'top-right',
	bottomLeft: 'bottom-left',
	bottomRight: 'bottom-right'
};

const directionMap = {
	top: 'north',
	right: 'east',
	bottom: 'south',
	left: 'west',
	topLeft: 'northwest',
	topRight: 'northeast',
	bottomLeft: 'southwest',
	bottomRight: 'southeast'
};

const cursorMap = {
	top: 'row-resize',
	right: 'col-resize',
	bottom: 'row-resize',
	left: 'col-resize',
	topLeft: 'nw-resize',
	topRight: 'ne-resize',
	bottomLeft: 'sw-resize',
	bottomRight: 'se-resize'
};

const defaults: ResizerOptions = {
	classname: 'resizer',
	handles: {},
	onResizing: () => { },
	onResized: () => { },
	onDestroy: () => { }
};

function bindStyles(el: ResizerElement, props: Record<string, string>) {
	el.style.zIndex = 50 + '';
	el.style.position = 'absolute';
	el.style.boxSizing = 'border-box';
	for (const [key, val] of Object.entries(props)) {
		el.style[key as any] = val;
	}
	return el;
}

function createHandles(classname: string, handles: ResizerHandles, debug = false) {
	return Object.entries(handles).reduce((result, [key, value]) => {
		if (value === true) {
			let el = document.createElement('div') as unknown as ResizerElement;
			el.$direction = directionMap[key as keyof typeof directionMap] as ResizerDirection;
			el.classList.add(classname, `${classname}-${classMap[key as keyof typeof classMap]}`);

			const barSize = 10;
			const barOffset = barSize / 2;
			const cornerSize = 12;
			const cornerOffset = cornerSize / 2;
			const cursor = cursorMap[key as keyof typeof cursorMap];
			const background = !debug
				? ''
				: ['top', 'left', 'right', 'bottom'].includes(key)
					? 'bluegray'
					: 'gray';

			if (['left', 'right'].includes(key)) {
				el = bindStyles(el, {
					width: `${barSize}px`,
					height: '100%',
					top: '0px',
					left: key === 'left' ? `-${barOffset}px` : '',
					right: key === 'right' ? `-${barOffset}px` : '',
					cursor,
					background
				});
			} else if (['top', 'bottom'].includes(key)) {
				el = bindStyles(el, {
					width: '100%',
					height: `${barSize}px`,
					left: '0px',
					top: key === 'top' ? `-${barOffset}px` : '',
					bottom: key === 'bottom' ? `-${barOffset}px` : '',
					cursor,
					background
				});
			} else if (['topLeft', 'topRight'].includes(key)) {
				el = bindStyles(el, {
					height: `${cornerSize}px`,
					width: `${cornerSize}px`,
					top: `-${cornerOffset}px`,
					left: key === 'topLeft' ? `-${cornerOffset}px` : '',
					right: key === 'topRight' ? `-${cornerOffset}px` : '',
					borderRadius: '100%',
					background
				});
			} else if (['bottomLeft', 'bottomRight'].includes(key)) {
				el = bindStyles(el, {
					height: `${cornerSize}px`,
					width: `${cornerSize}px`,
					bottom: `-${cornerOffset}px`,
					left: key === 'bottomLeft' ? `-${cornerOffset}px` : '',
					right: key === 'bottomRight' ? `-${cornerOffset}px` : '',
					borderRadius: '100%',
					background
				});
			}

			result = [...result, el];
		}
		return result;
	}, [] as ResizerElement[]);
}

export function useResizer(options = {} as ResizerOptions) {
	const { classname, handles, onResizing, onResized, onDestroy, debug } = {
		...defaults,
		...options
	} as Required<ResizerOptions>;

	const resizer = (element: HTMLElement) => {
		let active: ResizerElement | null = null;
		let initialRect: ResizerRectangle | null;
		let initialPos: ResizerPosition | null;

		element.style.position = 'relative';

		const parent = element.parentElement?.getBoundingClientRect();

		const _handles = createHandles(classname, handles, debug);

		_handles.forEach((handle) => {
			element.appendChild(handle);
			handle.addEventListener('mousedown', onMousedown);
		});

		// Start resizing.
		function onMousedown(event: MouseEvent) {
			event.preventDefault();
			if (event.button === 2) return;
			active = event.target as ResizerElement;

			const rect = element.getBoundingClientRect();

			if (!parent) return;

			initialRect = {
				width: rect.width,
				height: rect.height,
				left: rect.left - parent.left,
				right: parent.right - rect.right,
				top: rect.top - parent.top,
				bottom: parent.bottom - rect.bottom
			};

			initialPos = { x: event.pageX, y: event.pageY };

			active.classList.add(`${classname}-active`);
		}

		// Actively resizing.
		function onMove(event: MouseEvent) {
			if (!active || !initialPos || !initialRect || !parent) return;
			event.preventDefault();

			const direction = active.$direction;

			let delta;

			if (direction.match('east')) {
				delta = event.pageX - initialPos.x;
				element.style.width = `${initialRect.width + delta}px`;
			}

			if (direction.match('west')) {
				delta = initialPos.x - event.pageX;
				element.style.left = `${initialRect.left - delta}px`;
				element.style.width = `${initialRect.width + delta}px`;
			}

			if (direction.match('north')) {
				delta = initialPos.y - event.pageY;
				element.style.top = `${initialRect.top - delta}px`;
				element.style.height = `${initialRect.height + delta}px`;
			}

			if (direction.match('south')) {
				delta = event.pageY - initialPos.y;
				element.style.height = `${initialRect.height + delta}px`;
			}

			const newRect = element.getBoundingClientRect();

			const resizingRect = {
				...(initialRect as ResizerRectangle),
				...(initialPos as ResizerPosition),
				newWidth: newRect.width,
				newHeight: newRect.height,
				newLeft: newRect.left - parent.left,
				newRight: parent.right - newRect.right,
				newTop: newRect.top - parent.top,
				newBottom: parent.bottom - newRect.bottom
			};

			onResizing(resizingRect);
		}

		// End resizing.
		function onMouseup(event: MouseEvent) {
			if (!active || !parent) return;
			event?.preventDefault();

			const newRect = element.getBoundingClientRect();

			const resizedRect = {
				...(initialRect as ResizerRectangle),
				...(initialPos as ResizerPosition),
				newWidth: newRect.width,
				newHeight: newRect.height,
				newLeft: newRect.left - parent.left,
				newRight: parent.right - newRect.right,
				newTop: newRect.top - parent.top,
				newBottom: parent.bottom - newRect.bottom
			};

			onResized(resizedRect);

			active.classList.remove(`${classname}-active`);
			active = null;
			initialRect = null;
			initialPos = null;
		}

		window.addEventListener('mousemove', onMove);
		window.addEventListener('mouseup', onMouseup);

		return {
			destroy() {
				window.removeEventListener('mousemove', onMove);
				window.removeEventListener('mousedown', onMousedown);
				_handles.forEach((handle) => element.removeChild(handle));
				onDestroy();
			}
		};
	};

	return [resizer] as [typeof resizer];
}
