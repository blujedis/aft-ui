import type { defaultPalette, Features, Palette } from '@forewind/util';
import type {
	rounded,
	field_text_size,
	shadow,
	animate,
	dropshadow,
	border,
	font_transform,
	font_weight
} from './app/config/config';

// Element Helper

type TagName = keyof HTMLElementTagNameMap;

type Element<K extends TagName> = svelteHTML.IntrinsicElements[K];

export type PickElement<
	K extends TagName,
	E extends keyof Element<K> | undefined = undefined
> = E extends undefined ? Element<K> : Pick<Element<K>, Exclude<keyof Element<K>, E>>;

export type ElementEvent<T extends HTMLElement> = Event & {
	currentTarget: EventTarget & T;
	target: EventTarget & T;
	contains: (other: Node | null) => boolean;
	dispatchEvent: (event: any) => void;
	preventDefault: boolean;
};

// Theme

export type ThemeStoreConfig<
	P extends Palette,
	G extends Record<string, string | Record<string, any>>,
	C extends Record<string, Features>
> = {
	palette: P;
	config: G;
	components: C;
};

export type Themes = keyof typeof defaultPalette;

// Config

export type BaseSize = 'unstyled' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export type Rounded = keyof typeof rounded;

export type Shadow = keyof typeof shadow;

export type Dropshadow = keyof typeof dropshadow;

export type Animate = keyof typeof animate;

export type Border = keyof typeof border;

export type TextSize = keyof typeof field_text_size;

export type TextTransform = keyof typeof font_transform;

export type TextWeight = keyof typeof font_weight;
