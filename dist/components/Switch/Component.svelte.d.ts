import { SvelteComponent } from 'svelte';
declare const __propDef: {
	props: {
		classHandle?: string | undefined;
		classFill?: string | undefined;
		classBackdrop?: string | undefined;
		disabled?: boolean | undefined;
		focused?: import('../..').ThemeFocused | undefined;
		shadowed?: import('../..').ThemeShadowed | undefined;
		size?: import('../..').ThemeSize | undefined;
		srtext?: string | undefined;
		theme?: import('../..').ThemeColor | undefined;
		variant?: 'default' | undefined;
		unstyled?: boolean | undefined;
		color?: string | null | undefined;
		title?: string | null | undefined;
		form?: string | null | undefined;
		slot?: string | null | undefined;
		style?: string | null | undefined;
		pattern?: string | null | undefined;
		hidden?: boolean | null | undefined;
		accesskey?: string | null | undefined;
		autofocus?: boolean | null | undefined;
		class?:
			| string
			| (string & Record<string, unknown>)
			| (string & import('../..').ClassArgument[])
			| null
			| undefined;
		contenteditable?: 'inherit' | import('svelte/elements').Booleanish | null | undefined;
		contextmenu?: string | null | undefined;
		dir?: string | null | undefined;
		draggable?: import('svelte/elements').Booleanish | null | undefined;
		enterkeyhint?:
			| 'search'
			| 'done'
			| 'enter'
			| 'go'
			| 'next'
			| 'previous'
			| 'send'
			| null
			| undefined;
		id?: string | null | undefined;
		lang?: string | null | undefined;
		part?: string | null | undefined;
		placeholder?: string | null | undefined;
		spellcheck?: import('svelte/elements').Booleanish | null | undefined;
		tabindex?: number | null | undefined;
		translate?: '' | 'yes' | 'no' | null | undefined;
		inert?: boolean | null | undefined;
		radiogroup?: string | null | undefined;
		role?: import('svelte/elements').AriaRole | null | undefined;
		about?: string | null | undefined;
		datatype?: string | null | undefined;
		inlist?: any;
		prefix?: string | null | undefined;
		property?: string | null | undefined;
		resource?: string | null | undefined;
		typeof?: string | null | undefined;
		vocab?: string | null | undefined;
		autocapitalize?: string | null | undefined;
		autocorrect?: string | null | undefined;
		autosave?: string | null | undefined;
		itemprop?: string | null | undefined;
		itemscope?: boolean | null | undefined;
		itemtype?: string | null | undefined;
		itemid?: string | null | undefined;
		itemref?: string | null | undefined;
		results?: number | null | undefined;
		security?: string | null | undefined;
		unselectable?: 'on' | 'off' | null | undefined;
		inputmode?:
			| 'text'
			| 'search'
			| 'none'
			| 'tel'
			| 'url'
			| 'email'
			| 'numeric'
			| 'decimal'
			| null
			| undefined;
		is?: string | null | undefined;
		'bind:innerHTML'?: string | null | undefined;
		'bind:textContent'?: string | null | undefined;
		'bind:innerText'?: string | null | undefined;
		'bind:contentRect'?: DOMRectReadOnly | null | undefined;
		'bind:contentBoxSize'?: ResizeObserverSize[] | null | undefined;
		'bind:borderBoxSize'?: ResizeObserverSize[] | null | undefined;
		'bind:devicePixelContentBoxSize'?: ResizeObserverSize[] | null | undefined;
		'aria-activedescendant'?: string | null | undefined;
		'aria-atomic'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-autocomplete'?: 'none' | 'both' | 'list' | 'inline' | null | undefined;
		'aria-busy'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-checked'?: boolean | 'true' | 'false' | 'mixed' | null | undefined;
		'aria-colcount'?: number | null | undefined;
		'aria-colindex'?: number | null | undefined;
		'aria-colspan'?: number | null | undefined;
		'aria-controls'?: string | null | undefined;
		'aria-current'?:
			| 'time'
			| import('svelte/elements').Booleanish
			| 'page'
			| 'step'
			| 'location'
			| 'date'
			| null
			| undefined;
		'aria-describedby'?: string | null | undefined;
		'aria-details'?: string | null | undefined;
		'aria-disabled'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-dropeffect'?: 'link' | 'none' | 'copy' | 'execute' | 'move' | 'popup' | null | undefined;
		'aria-errormessage'?: string | null | undefined;
		'aria-expanded'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-flowto'?: string | null | undefined;
		'aria-grabbed'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-haspopup'?:
			| 'dialog'
			| 'menu'
			| import('svelte/elements').Booleanish
			| 'grid'
			| 'listbox'
			| 'tree'
			| null
			| undefined;
		'aria-hidden'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-invalid'?:
			| import('svelte/elements').Booleanish
			| 'grammar'
			| 'spelling'
			| null
			| undefined;
		'aria-keyshortcuts'?: string | null | undefined;
		'aria-label'?: string | null | undefined;
		'aria-labelledby'?: string | null | undefined;
		'aria-level'?: number | null | undefined;
		'aria-live'?: 'off' | 'assertive' | 'polite' | null | undefined;
		'aria-modal'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-multiline'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-multiselectable'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-orientation'?: 'horizontal' | 'vertical' | null | undefined;
		'aria-owns'?: string | null | undefined;
		'aria-placeholder'?: string | null | undefined;
		'aria-posinset'?: number | null | undefined;
		'aria-pressed'?: boolean | 'true' | 'false' | 'mixed' | null | undefined;
		'aria-readonly'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-relevant'?:
			| 'text'
			| 'additions'
			| 'additions removals'
			| 'additions text'
			| 'all'
			| 'removals'
			| 'removals additions'
			| 'removals text'
			| 'text additions'
			| 'text removals'
			| null
			| undefined;
		'aria-required'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-roledescription'?: string | null | undefined;
		'aria-rowcount'?: number | null | undefined;
		'aria-rowindex'?: number | null | undefined;
		'aria-rowspan'?: number | null | undefined;
		'aria-selected'?: import('svelte/elements').Booleanish | null | undefined;
		'aria-setsize'?: number | null | undefined;
		'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other' | null | undefined;
		'aria-valuemax'?: number | null | undefined;
		'aria-valuemin'?: number | null | undefined;
		'aria-valuenow'?: number | null | undefined;
		'aria-valuetext'?: string | null | undefined;
		'on:copy'?:
			| import('svelte/elements').ClipboardEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:cut'?: import('svelte/elements').ClipboardEventHandler<HTMLInputElement> | null | undefined;
		'on:paste'?:
			| import('svelte/elements').ClipboardEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:compositionend'?:
			| import('svelte/elements').CompositionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:compositionstart'?:
			| import('svelte/elements').CompositionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:compositionupdate'?:
			| import('svelte/elements').CompositionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:focus'?: import('svelte/elements').FocusEventHandler<HTMLInputElement> | null | undefined;
		'on:focusin'?: import('svelte/elements').FocusEventHandler<HTMLInputElement> | null | undefined;
		'on:focusout'?:
			| import('svelte/elements').FocusEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:blur'?: import('svelte/elements').FocusEventHandler<HTMLInputElement> | null | undefined;
		'on:change'?: import('svelte/elements').ChangeEventHandler<HTMLInputElement> | null | undefined;
		'on:beforeinput'?:
			| import('svelte/elements').EventHandler<InputEvent, HTMLInputElement>
			| null
			| undefined;
		'on:input'?: import('svelte/elements').FormEventHandler<HTMLInputElement> | null | undefined;
		'on:reset'?: import('svelte/elements').FormEventHandler<HTMLInputElement> | null | undefined;
		'on:submit'?:
			| import('svelte/elements').EventHandler<SubmitEvent, HTMLInputElement>
			| null
			| undefined;
		'on:invalid'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:formdata'?:
			| import('svelte/elements').EventHandler<FormDataEvent, HTMLInputElement>
			| null
			| undefined;
		'on:load'?: import('svelte/elements').EventHandler<Event, Element> | null | undefined;
		'on:error'?: import('svelte/elements').EventHandler<Event, Element> | null | undefined;
		'on:toggle'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:keydown'?:
			| import('svelte/elements').KeyboardEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:keypress'?:
			| import('svelte/elements').KeyboardEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:keyup'?:
			| import('svelte/elements').KeyboardEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:abort'?: import('svelte/elements').EventHandler<Event, HTMLInputElement> | null | undefined;
		'on:canplay'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:canplaythrough'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:cuechange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:durationchange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:emptied'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:encrypted'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:ended'?: import('svelte/elements').EventHandler<Event, HTMLInputElement> | null | undefined;
		'on:loadeddata'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:loadedmetadata'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:loadstart'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:pause'?: import('svelte/elements').EventHandler<Event, HTMLInputElement> | null | undefined;
		'on:play'?: import('svelte/elements').EventHandler<Event, HTMLInputElement> | null | undefined;
		'on:playing'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:progress'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:ratechange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:seeked'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:seeking'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:stalled'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:suspend'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:timeupdate'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:volumechange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:waiting'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:auxclick'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:click'?: import('svelte/elements').MouseEventHandler<HTMLInputElement> | null | undefined;
		'on:contextmenu'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:dblclick'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:drag'?: import('svelte/elements').DragEventHandler<HTMLInputElement> | null | undefined;
		'on:dragend'?: import('svelte/elements').DragEventHandler<HTMLInputElement> | null | undefined;
		'on:dragenter'?:
			| import('svelte/elements').DragEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:dragexit'?: import('svelte/elements').DragEventHandler<HTMLInputElement> | null | undefined;
		'on:dragleave'?:
			| import('svelte/elements').DragEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:dragover'?: import('svelte/elements').DragEventHandler<HTMLInputElement> | null | undefined;
		'on:dragstart'?:
			| import('svelte/elements').DragEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:drop'?: import('svelte/elements').DragEventHandler<HTMLInputElement> | null | undefined;
		'on:mousedown'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:mouseenter'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:mouseleave'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:mousemove'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:mouseout'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:mouseover'?:
			| import('svelte/elements').MouseEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:mouseup'?: import('svelte/elements').MouseEventHandler<HTMLInputElement> | null | undefined;
		'on:select'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:selectionchange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:selectstart'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:touchcancel'?:
			| import('svelte/elements').TouchEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:touchend'?:
			| import('svelte/elements').TouchEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:touchmove'?:
			| import('svelte/elements').TouchEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:touchstart'?:
			| import('svelte/elements').TouchEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:gotpointercapture'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointercancel'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointerdown'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointerenter'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointerleave'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointermove'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointerout'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointerover'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:pointerup'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:lostpointercapture'?:
			| import('svelte/elements').PointerEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:scroll'?: import('svelte/elements').UIEventHandler<HTMLInputElement> | null | undefined;
		'on:resize'?: import('svelte/elements').UIEventHandler<HTMLInputElement> | null | undefined;
		'on:wheel'?: import('svelte/elements').WheelEventHandler<HTMLInputElement> | null | undefined;
		'on:animationstart'?:
			| import('svelte/elements').AnimationEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:animationend'?:
			| import('svelte/elements').AnimationEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:animationiteration'?:
			| import('svelte/elements').AnimationEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:transitionstart'?:
			| import('svelte/elements').TransitionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:transitionrun'?:
			| import('svelte/elements').TransitionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:transitionend'?:
			| import('svelte/elements').TransitionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:transitioncancel'?:
			| import('svelte/elements').TransitionEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:outrostart'?:
			| import('svelte/elements').EventHandler<CustomEvent<null>, HTMLInputElement>
			| null
			| undefined;
		'on:outroend'?:
			| import('svelte/elements').EventHandler<CustomEvent<null>, HTMLInputElement>
			| null
			| undefined;
		'on:introstart'?:
			| import('svelte/elements').EventHandler<CustomEvent<null>, HTMLInputElement>
			| null
			| undefined;
		'on:introend'?:
			| import('svelte/elements').EventHandler<CustomEvent<null>, HTMLInputElement>
			| null
			| undefined;
		'on:message'?:
			| import('svelte/elements').MessageEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:messageerror'?:
			| import('svelte/elements').MessageEventHandler<HTMLInputElement>
			| null
			| undefined;
		'on:visibilitychange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:cancel'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:close'?: import('svelte/elements').EventHandler<Event, HTMLInputElement> | null | undefined;
		'on:fullscreenchange'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		'on:fullscreenerror'?:
			| import('svelte/elements').EventHandler<Event, HTMLInputElement>
			| null
			| undefined;
		max?: string | number | null | undefined;
		list?: string | null | undefined;
		step?: string | number | null | undefined;
		width?: string | number | null | undefined;
		height?: string | number | null | undefined;
		name?: string | null | undefined;
		capture?: boolean | 'user' | 'environment' | null | undefined;
		min?: string | number | null | undefined;
		multiple?: boolean | null | undefined;
		value?: any;
		formaction?: string | null | undefined;
		formenctype?: string | null | undefined;
		formmethod?: string | null | undefined;
		formnovalidate?: boolean | null | undefined;
		formtarget?: string | null | undefined;
		type?: import('svelte/elements').HTMLInputTypeAttribute | null | undefined;
		alt?: string | null | undefined;
		src?: string | null | undefined;
		crossorigin?: string | null | undefined;
		accept?: string | null | undefined;
		autocomplete?: string | null | undefined;
		checked?: boolean | null | undefined;
		maxlength?: number | null | undefined;
		minlength?: number | null | undefined;
		readonly?: boolean | null | undefined;
		required?: boolean | null | undefined;
		'bind:checked'?: boolean | null | undefined;
		'bind:value'?: any;
		'bind:group'?: any;
		'bind:files'?: FileList | null | undefined;
		'bind:indeterminate'?: boolean | null | undefined;
	};
	events: {
		[evt: string]: CustomEvent<any>;
	};
	slots: {};
};
export type ComponentProps = typeof __propDef.props;
export type ComponentEvents = typeof __propDef.events;
export type ComponentSlots = typeof __propDef.slots;
export default class Component extends SvelteComponent<
	ComponentProps,
	ComponentEvents,
	ComponentSlots
> {}
export {};
