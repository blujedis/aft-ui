import colormap from './colormap';

// Tailwind Default classes

export const font_size = {
	unstyled: '',
	base: 'text-base',
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-md',
	lg: 'text-lg',
	xl: 'text-xl',
	'2xl': 'text-2xl',
	'3xl': 'text-3xl',
	'4xl': 'text-4xl',
	'5xl': 'text-5xl',
	'6xl': 'text-6xl',
	'7xl': 'text-7xl',
	'8xl': 'text-8xl',
	'9xl': 'text-9xl'
};

export const font_transform = {
	unstyled: '',
	uppercase: 'uppercase',
	lowercase: 'lowercase',
	capitalize: 'capitalize',
	normal: 'normal-case',
	italic: 'italic',
	unitalic: 'not-italic'
};

export const font_weight = {
	unstyled: '',
	thin: 'font-thin',
	extralight: 'font-extralight',
	light: 'font-light',
	normal: 'font-normal',
	medium: 'font-medium',
	semibold: 'font-semibold',
	bold: 'font-bold',
	extrabold: 'font-extrabold',
	black: 'font-black'
};

export const font_spacing = {
	unstyled: '',
	tighter: 'tracking-tighter',
	tight: 'tracking-tight',
	normal: 'tracking-normal',
	wide: 'tracking-wide',
	wider: 'tracking-wider',
	widest: 'tracking-widest'
};

export const font_leading = {
	unstyled: '',
	'3': 'leading-3',
	'4': 'leading-3',
	'5': 'leading-3',
	'6': 'leading-3',
	'7': 'leading-3',
	'8': 'leading-3',
	'9': 'leading-3',
	'10': 'leading-3',
	tight: 'leading-tight',
	snug: 'leading-snug',
	normal: 'leading-normal',
	relaxed: 'leading-relaxed',
	loose: 'leading-loose',
	none: 'leading-none'
};

export const font_overflow = {
	unstyled: '',
	truncate: 'truncate',
	ellipsis: 'ellipsis',
	clip: 'text-clip'
};

// Size related classes.

export const field_text_size = {
	unstyled: '',
	xs: font_size.xs,
	sm: font_size.sm,
	md: font_size.sm,
	lg: font_size.md,
	xl: font_size.lg,
	'2xl': font_size.xl
};

export const field_padding_y = {
	unstyled: '',
	xs: 'py-1',
	sm: 'py-1.5',
	md: 'py-2.5',
	lg: 'py-3',
	xl: 'py-3.5',
	'2xl': 'py-4'
};

export const field_padding_x = {
	unstyled: '',
	xs: 'px-2',
	sm: 'px-2.5',
	md: 'px-3',
	lg: 'px-4',
	xl: 'px-5',
	'2xl': 'px-5'
};

export const animate = {
	unstyled: '',
	none: 'animate-none',
	spin: 'animate-spin',
	ping: 'animate-ping',
	pulse: 'animate-pulse',
	bounce: 'animate-bounce'
};

// Unique size classes

export const border = {
	unstyled: '',

	0: 'border-0',
	1: 'border',
	2: 'border-2',
	4: 'border-4',
	8: 'border-8',
	t: 'border-t',
	b: 'border-b',
	r: 'border-r',
	l: 'border-l',

	x: 'border-x',
	'x-0': 'border-x-0',
	'x-2': 'border-x-2',
	'x-4': 'border-x-4',
	'x-8': 'border-x-8',

	y: 'border-y',
	'y-0': 'border-y-0',
	'y-2': 'border-y-2',
	'y-4': 'border-y-4',
	'y-8': 'border-y-8',

	't-0': 'border-t-0',
	't-2': 'border-t-2',
	't-4': 'border-t-4',
	't-8': 'border-t-8',

	'r-0': 'border-r-0',
	'r-2': 'border-r-2',
	'r-4': 'border-r-4',
	'r-8': 'border-r-8',

	'b-0': 'border-b-0',
	'b-2': 'border-b-2',
	'b-4': 'border-b-4',
	'b-8': 'border-b-8',

	'l-0': 'border-l-0',
	'l-2': 'border-l-2',
	'l-4': 'border-l-4',
	'l-8': 'border-l-8'
};

export const shadow = {
	unstyled: '',
	inner: 'shadow-inner',
	none: 'shadow-none',
	xs: 'shadow-sm',
	sm: 'shadow',
	md: 'shadow-md',
	lg: 'shadow-lg',
	xl: 'shadow-xl',
	'2xl': 'shadow-2xl'
};

export const dropshadow = {
	unstyled: '',
	none: 'drop-shadow-none',
	xs: 'drop-shadow-xs',
	sm: 'drop-shadow-sm',
	md: 'drop-shadow-md',
	lg: 'drop-shadow-lg',
	xl: 'drop-shadow-xl',
	'2xl': 'drop-shadow-2xl'
};

export const rounded = {
	unstyled: '',
	xs: 'rounded-sm',
	sm: 'rounded',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	'2xl': 'rounded-2xl',
	full: 'rounded-full',
	none: 'rounded-none'
};

export const field_rounded_padding_x = {
	unstyled: { unstyled: '', xs: '', sm: '', md: '', lg: '', xl: '', '2xl': '' },
	none: { unstyled: '', xs: '', sm: '', md: '', lg: '', xl: '', '2xl': '' },
	xs: {
		unstyled: '',
		xs: 'px-2',
		sm: 'px-2.5',
		md: 'px-3',
		lg: 'px-4',
		xl: 'px-5',
		'2xl': 'px-5'
	},
	sm: {
		unstyled: '',
		xs: 'px-2',
		sm: 'px-2.5',
		md: 'px-3',
		lg: 'px-4',
		xl: 'px-3.5',
		'2xl': 'px-4'
	},
	md: {
		unstyled: '',
		xs: 'px-2', // default: 2
		sm: 'px-2.5', // default: 2.5
		md: 'px-3', // default: 3
		lg: 'px-4', // default: 4
		xl: 'px-5', // default: 5
		'2xl': 'px-5' // default: 5
	},
	lg: {
		unstyled: '',
		xs: 'px-2.5',
		sm: 'px-3',
		md: 'px-3.5',
		lg: 'px-4',
		xl: 'px-5',
		'2xl': 'px-5'
	},
	xl: {
		unstyled: '',
		xs: 'px-2.5',
		sm: 'px-3',
		md: 'px-3.5',
		lg: 'px-4',
		xl: 'px-5',
		'2xl': 'px-5'
	},
	'2xl': {
		unstyled: '',
		xs: 'px-3',
		sm: 'px-3.5',
		md: 'px-4',
		lg: 'px-4',
		xl: 'px-5',
		'2xl': 'px-5'
	},
	full: {
		unstyled: '',
		xs: 'px-3.5',
		sm: 'px-4',
		md: 'px-5',
		lg: 'px-6',
		xl: 'px-6',
		'2xl': 'px-7'
	}
};

/**
 * Global options used in config files.
 */
export const common = {
	/** Sets the default size, offset background for ring effect */
	ringed:
		'focus:ring focus:ring-offset-0 focus:outline-none focus:ring-offset-white dark:focus:ring-offset-gray-800',
	/** Sets the default size, offset background for ring effect for peers */
	ringed_peer:
		'peer-focus:ring peer-focus:ring-offset-0 peer-focus:outline-none peer-focus:ring-offset-white dark:peer-focus:ring-offset-gray-800',
	/** Applied on inputs, buttons to smoothly transition colors. */
	transition: 'transition-colors duration-100',
	/** Default shadow to be used for box shadows */
	shadow: 'dark:shadow-black/40',
	/** Filter used for setting forms elements as disabled. */
	disabled: 'saturate-50 brightness-95 dark:contrast-125 dark:brightness-75  pointer-events-none ',
	/** Cheesy pressed effect for clickable elements. */
	active: 'active:brightness-90',
	/** Placeholder color */
	placeholder: 'placeholder:text-slate-400 dark:placeholder:text-slate-400',
	/** Placeholder color for peer placeholders like in floating label effect. */
	placeholder_peer_shown:
		'peer-placeholder-shown:text-slate-400 dark:peer-placeholder-shown:text-slate-400'
};

export const config = {
	colormap,
	common,
	animate,
	border,
	field_text_size: field_text_size,
	field_padding_y: field_padding_y,
	field_padding_x: field_padding_x,
	shadow,
	dropshadow,
	rounded,
	field_rounded_padding_x: field_rounded_padding_x,
	font_weight: font_weight,
	font_spacing: font_spacing,
	font_leading: font_leading,
	font_transform: font_transform,
	font_overflow: font_overflow,
	font_size: font_size
};

export default config;
