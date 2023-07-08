import { createPopper as createPopperInstance } from '@popperjs/core';
import { onDestroy, SvelteComponent, SvelteComponentTyped } from 'svelte';
import Popover from '../components/Popover';
export class PopoverComponent extends SvelteComponentTyped {}
/**
 * Hook creates new Popper instance using reference node and content node Svelte Actions.
 *
 * @example
 * <script>
 * 		import { usePopper } from '../usePopper';
 * 		const [ref, content] = usePopper({
 * 			modifier: [{ name: 'offset', options: { offset: [0, 8] } }]
 * 		});
 * 		let visible = false;
 * </script>
 *
 * <button>My Tooltip</button>
 * {#if visible}
 * 		<div id="tooltip" use:content>
 * 			Hello Tooltip!
 * 			<div id="arrow" data-popper-arrow />
 * 		</div>
 * {/if}
 *
 *
 * @param initOptions the options to initialize Popper instance.
 */
export function createPopper(initOptions) {
	initOptions = {
		modifiers: [{ name: 'offset', options: { offset: [0, 8] } }],
		...initOptions
	};
	let options = initOptions;
	let instance = null;
	let ref;
	let content;
	function init() {
		if (ref !== undefined && content !== undefined)
			instance = createPopperInstance(ref, content, options);
	}
	function destroy() {
		if (instance !== null) {
			instance.destroy();
			instance = null;
		}
	}
	function createVirtual(node) {
		const unsubscribe = node.subscribe((n) => {
			if (ref === undefined) {
				ref = n;
				init();
			} else {
				Object.assign(ref, n);
				instance?.update();
			}
		});
		onDestroy(unsubscribe);
	}
	function createRef(node) {
		if ('subscribe' in node) {
			createVirtual(node);
			return {};
		} else {
			ref = node;
			init();
			return {
				destroy
			};
		}
	}
	function createContent(node, contentOptions) {
		content = node;
		options = { ...initOptions, ...contentOptions };
		init();
		return {
			update(updateOptions) {
				options = { ...initOptions, ...updateOptions };
				instance?.setOptions(options);
			},
			destroy
		};
	}
	return [createRef, createContent, () => ({ ...instance, ref, content, destroy })];
}
export function createPopover(initOptions = {}) {
	const options = {
		type: 'hover',
		target: document.body,
		...initOptions
	};
	if (typeof options.escapable === 'undefined' && options.type === 'click')
		options.escapable = true;
	const {
		node: initNode,
		component: initComponent,
		target: initTarget,
		type,
		props,
		selector,
		escapable,
		...rest
	} = options;
	const [createRef, createContent, getInstance] = createPopper(rest);
	const Component = initComponent || Popover;
	let visible = false;
	let node = null;
	let component = null;
	let content = null;
	let events = [];
	const target = typeof initTarget === 'string' ? document.querySelector(initTarget) : initTarget;
	function bind() {
		if (!node) return;
		if (type === 'hover') {
			node.addEventListener('mouseover', show);
			node.addEventListener('mouseout', hide);
			events = [...events, ['mouseover', show], ['mouseout', hide]];
		} else if (type === 'click') {
			node.addEventListener('click', handleClick);
			events = [...events, ['click', handleClick]];
		} else if (type === 'focus') {
			node.addEventListener('focus', show);
			node.addEventListener('blur', hide);
			events = [...events, ['focus', show], ['blur', hide]];
		}
		if (escapable) window.addEventListener('keydown', handleEscape);
	}
	function unbind() {
		events.forEach(([event, handler]) => node?.removeEventListener(event, handler));
		if (type === 'click') document.removeEventListener('click', handleClickOutside);
		window.removeEventListener('keydown', handleEscape);
	}
	function register(registerNode) {
		if (registerNode) {
			node = registerNode;
			bind();
		}
	}
	function handleEscape(event) {
		if (event.key === 'Escape' && visible) hide();
	}
	function handleClick() {
		if (visible) hide();
		else show();
	}
	function handleClickOutside(event) {
		if (!node || event.target === node) return;
		if (content && !content.contains(event.target) && visible) hide();
	}
	function show() {
		if (!target) return;
		component = new Component({
			target,
			props
		});
		content = target.querySelector(selector);
		if (!node || !content) return;
		visible = true;
		content.setAttribute('data-show', '');
		createRef(node);
		createContent(content);
		if (type === 'click') document.addEventListener('click', handleClickOutside);
	}
	function hide() {
		if (!target) return;
		content = target.querySelector(selector);
		content?.removeAttribute('data-show');
		visible = false;
		reset();
		if (type === 'click') document.removeEventListener('click', handleClickOutside);
		node?.focus();
	}
	function reset() {
		if (component) component.$destroy();
		const popper = getInstance();
		if (popper) popper.destroy();
		component = null;
	}
	function destroy() {
		unbind();
		reset();
	}
	if (initNode) register(initNode);
	return {
		register,
		bind,
		unbind,
		show,
		hide,
		destroy
	};
}
/**
 * Helper to create popover on element.
 *
 * @example
 * <a href="#" use:popover title="My Tooltip">Some Link</a>
 * <a href="#" use:popover={{ options... }}>Link with Options</a>
 *
 * @param node the node to apply the popover to.
 * @param options the popover options to be applied.
 */
export function popover(node, options = {}) {
	options = {
		target: '#popover-container',
		selector: '.popover',
		...options,
		node
	};
	const content = node.getAttribute('title');
	node.setAttribute('title', '');
	options.props = {
		content,
		...options.props,
		arrowed: true
	};
	const { destroy } = createPopover(options);
	return {
		destroy
	};
}
