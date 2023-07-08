export const borderSizes = {
	unstyled: '',
	transparent: 'border-transparent',
	none: 'border-0',
	xs: 'border',
	sm: 'border-2',
	md: 'border-4',
	lg: 'border-6',
	xl: 'border-8',
	xl2: 'border-10'
};
export const borderStyles = {
	unstyled: '',
	none: 'border-none',
	solid: 'border-solid',
	dashed: 'border-dashed',
	dotted: 'border-dotted',
	double: 'border-double',
	hidden: 'border-hidden'
};
export const fieldPadding = {
	unstyled: '',
	xs: 'px-2.5 py-1',
	sm: 'px-2.5 py-1.5',
	md: 'px-3 py-2',
	lg: 'px-3.5 py-2.5',
	xl: 'px-5 py-3',
	xl2: 'px-6 py-3.5'
};
export const buttonPadding = {
	unstyled: '',
	xs: 'px-2.5 py-1',
	sm: 'px-3 py-1.5',
	md: 'px-4 py-2',
	lg: 'px-5 py-2.5',
	xl: 'px-6 py-3',
	xl2: 'px-8 py-3.5'
};
export const objectFit = {
	unstyled: '',
	none: 'object-none',
	contain: 'object-contain',
	cover: 'object-cover',
	fill: 'object-fill',
	scaled: 'object-scale-down'
};
export const objectPosition = {
	// requires above 'object-none'
	unstyled: '',
	center: 'object-center',
	top: 'object-top',
	'top-right': 'object-right-top',
	'top-left': 'object-left-top',
	bottom: 'object-bottom',
	'bottom-right': 'object-right-bottom',
	'botom-left': 'object-left-bottom',
	left: 'object-left',
	right: 'object-right'
};
export const aspectRatio = {
	unstyled: '',
	auto: 'aspect-auto',
	square: 'aspect-square',
	video: 'aspect-video'
};
export const roundeds = {
	unstyled: '',
	none: 'rounded-none',
	xs: 'rounded-sm',
	sm: 'rounded',
	md: 'rounded-md',
	lg: 'rounded-lg',
	xl: 'rounded-xl',
	xl2: 'rounded-2xl',
	full: 'rounded-full'
};
export const fontSizes = {
	unstyled: '',
	base: 'text-base',
	xs: 'text-xs',
	sm: 'text-sm',
	md: 'text-base',
	lg: 'text-lg',
	xl: 'text-xl',
	xl2: 'text-2xl',
	xl3: 'text-3xl',
	xl4: 'text-4xl',
	xl5: 'text-5xl',
	xl6: 'text-6xl',
	xl7: 'text-7xl',
	xl8: 'text-8xl',
	xl9: 'text-9xl'
};
export const fieldFontSizes = {
	unstyled: '',
	xs: fontSizes.xs,
	sm: fontSizes.sm,
	md: fontSizes.sm,
	lg: fontSizes.base,
	xl: fontSizes.lg,
	xl2: fontSizes.xl
};
export const boxPadding = {
	unstyled: '',
	xs: 'p-3',
	sm: 'p-4',
	md: 'p-6',
	lg: 'p-8',
	xl: 'p-10',
	xl2: 'px-12'
};
export const shadows = {
	unstyled: '',
	inner: 'shadow-inner',
	none: 'shadow-none',
	xs: 'shadow-sm',
	sm: 'shadow',
	md: 'shadow-md',
	lg: 'shadow-lg',
	xl: 'shadow-xl',
	xl2: 'shadow-2xl'
};
export const dropshadows = {
	unstyled: '',
	inner: '',
	none: 'drop-shadow-none',
	xs: 'drop-shadow-xs',
	sm: 'drop-shadow-sm',
	md: 'drop-shadow-md',
	lg: 'drop-shadow-lg',
	xl: 'drop-shadow-xl',
	xl2: 'drop-shadow-2xl'
};
export const resizes = {
	unstyled: '',
	none: 'resize-none',
	x: 'resize-x',
	y: 'resize-y',
	both: 'resize-both'
};
export const fontLeadings = {
	unstyled: '',
	none: 'leading-none',
	xs: 'leading-3',
	sm: 'leading-4',
	md: 'leading-5',
	lg: 'leading-6',
	xl: 'leading-7',
	xl2: 'leading-8',
	xl3: 'leading-9',
	xl4: 'leading-10',
	tight: 'leading-tight',
	snug: 'leading-snug',
	normal: 'leading-normal',
	relaxed: 'leading-relaxed',
	loose: 'leading-loose'
};
export const focused = {
	// ring-offset should be set to the same as main background.
	$base: 'focus:outline-none',
	white: 'focus:ring-white',
	default: 'focus:ring-default-500',
	primary: 'focus:ring-primary-500',
	secondary: 'focus:ring-secondary-500',
	tertiary: 'focus:ring-tertiary-500',
	danger: 'focus:ring-danger-500',
	warning: 'focus:ring-warning-500',
	success: 'focus:ring-success-500',
	info: 'focus:ring-info-500'
};
// focus:ring-opacity-50 focus:ring-offset-2
// focus-visible:ring-opacity-30 focus-visible:ring-offset-2
export const focusedVisible = {
	// ring-offset should be set to the same as main background.
	$base: 'focus-visible:outline-none',
	white: 'focus-visible:ring-white',
	default: 'focus-visible:ring-default-500',
	primary: 'focus-visible:ring-primary-500',
	secondary: 'focus-visible:ring-secondary-500',
	tertiary: 'focus-visible:ring-tertiary-500',
	danger: 'focus-visible:ring-danger-500',
	warning: 'focus-visible:ring-warning-500',
	success: 'focus-visible:ring-success-500',
	info: 'focus-visible:ring-info-500'
};
export const focusedSizes = {
	$base: '',
	unstyled: '',
	xs: 'focus:ring-1',
	sm: 'focus:ring-2',
	md: 'focus:ring-2',
	lg: 'focus:ring-4',
	xl: 'focus:ring-4',
	xl2: 'focus:ring-8'
};
export const focusedVisibleSizes = {
	$base: '',
	unstyled: '',
	xs: 'focus-visible:ring-1',
	sm: 'focus-visible:ring-2',
	md: 'focus-visible:ring-2',
	lg: 'focus-visible:ring-4',
	xl: 'focus-visible:ring-4',
	xl2: 'focus-visible:ring-8'
};
export const focusedPositionSizes = {
	$base: '',
	unstyled: '',
	inset: 'focus:ring-inset focus-visible:ring-inset',
	offset0: 'focus:ring-offset-0 focus-visible:ring-offset-0',
	offset1: 'focus:ring-offset-1 focus-visible:ring-offset-1',
	offset2: 'focus:ring-offset-2 focus-visible:ring-offset-2',
	offset4: 'focus:ring-offset-4 focus-visible:ring-offset-4',
	offset8: 'focus:ring-offset-8 focus-visible:ring-offset-8'
};
export const disableds = {
	$base: 'aria-disabled:saturate-50 aria-disabled:brightness-95 aria-disabled:pointer-events-none',
	white: 'aria-disabled:text-default-300',
	default: 'aria-disabled:text-default-300',
	primary: 'aria-disabled:text-primary-300',
	secondary: 'aria-disabled:text-secondary-300',
	tertiary: 'aria-disabled:text-tertiary-300',
	danger: 'aria-disabled:text-danger-300',
	warning: 'aria-disabled:text-warning-300',
	success: 'aria-disabled:text-success-300',
	info: 'aria-disabled:text-info-300'
};
export const placeholders = {
	white: 'placeholder:text-white aria-disabled:placeholder:text-white',
	default: 'placeholder:text-default-200 aria-disabled:placeholder:text-default-50',
	primary: 'placeholder:text-primary-400 aria-disabled:placeholder:text-primary-300',
	secondary: 'placeholder:text-secondary-400 aria-disabled:placeholder:text-secondary-300',
	tertiary: 'placeholder:text-tertiary-400 aria-disabled:placeholder:text-tertiary-300',
	danger: 'placeholder:text-danger-400 aria-disabled:placeholder:text-danger-430',
	warning: 'placeholder:text-warning-400 aria-disabled:placeholder:text-warning-300',
	success: 'placeholder:text-success-400 aria-disabled:placeholder:text-success-300',
	info: 'placeholder:text-info-400 aria-disabled:placeholder:text-info-300'
};
export const common = {
	active: 'active:brightness-125',
	transition: 'transition-colors duration-125'
};
///////////////////////////////////////////////
// const options = {
//   // avatarSizes,
//   // avatarNotificationSizes,
//   // badgeFontSizes,
//   // badgePadding,
//   // breadcrumbMargins,
//   // breadcrumbSpacings,
//   body,
//   borderSizes,
//   borderStyles,
//   boxPadding,
//   buttonPadding,
//   disableds,
//   dropshadows,
//   // emptySizes,
//   fieldFontSizes,
//   fieldPadding,
//   focused,
//   focusedVisible,
//   fontSizes,
//   iconSizes,
//   // paginationFlushedPadding,
//   // paginationGroupedPadding,
//   // paginationIconSizes,
//   placeholders,
//   // popoverSizes,
//   resizes,
//   roundeds,
//   shadows,
//   // switchButtonSizes,
//   // switchFillSizes,
//   // switchHandleSizes,
//   // switchTranslateSizes,
//   // titlePadding,
//   common,
//   // fontLeadings,
//   // fontOverflows,
//   // fontTrackings,
//   // fontTransforms,
//   // fontWeights,
//   // textDecorations
// };
// export default options;
// export const fontTransforms = {
//   unstyled: '',
//   uppercase: 'uppercase',
//   lowercase: 'lowercase',
//   capitalize: 'capitalize',
//   normal: 'normal-case',
//   italic: 'italic',
//   unitalic: 'not-italic'
// };
// export const textDecorations = {
//   unstyled: '',
//   underline: 'underline',
//   underlineHover: 'hover:underline',
//   overline: 'overline',
//   throughline: 'line-through',
//   underlineless: 'no-underline'
// };
// export const fontWeights = {
//   unstyled: '',
//   thin: 'font-thin',
//   extralight: 'font-extralight',
//   default: 'font-light',
//   normal: 'font-normal',
//   medium: 'font-medium',
//   semibold: 'font-semibold',
//   bold: 'font-bold',
//   extrabold: 'font-extrabold',
//   dark: 'font-black'
// };
// export const fontTrackings = {
//   unstyled: '',
//   tighter: 'tracking-tighter',
//   tight: 'tracking-tight',
//   normal: 'tracking-normal',
//   wide: 'tracking-wide',
//   wider: 'tracking-wider',
//   widest: 'tracking-widest'
// };
// export const fontLeadings = {
//   unstyled: '',
//   none: 'leading-none',
//   xs: 'leading-3',
//   sm: 'leading-4',
//   md: 'leading-5',
//   lg: 'leading-6',
//   xl: 'leading-7',
//   xl2: 'leading-8',
//   xl3: 'leading-9',
//   xl4: 'leading-10',
//   tight: 'leading-tight',
//   snug: 'leading-snug',
//   normal: 'leading-normal',
//   relaxed: 'leading-relaxed',
//   loose: 'leading-loose'
// };
// export const fontOverflows = {
//   unstyled: '',
//   truncate: 'truncate',
//   ellipsis: 'ellipsis',
//   clip: 'text-clip'
// };
/////////////////////////////////////////////
// export const badgeFontSizes = {
//   unstyled: '',
//   xs: 'text-[10px]',
//   sm: 'text-xs',
//   md: 'text-sm',
//   lg: 'text-md',
//   xl: 'text-lg',
//   xl2: 'text-xl'
// };
// export const badgePadding = {
//   unstyled: '',
//   xs: 'px-1.5 py-0.5',
//   sm: 'px-2 py-0.5',
//   md: 'px-2.5 py-0.5 ',
//   lg: 'px-3 py-0.5',
//   xl: 'px-4 py-1',
//   xl2: 'px-5 py-1.5'
// };
// export const emptySizes = {
//   unstyled: '',
//   xs: 'p-6',
//   sm: 'p-8',
//   md: 'p-12',
//   lg: 'p-16',
//   xl: 'p-20',
//   xl2: 'p-24'
// };
// export const switchButtonSizes = {
//   unstyled: '',
//   xs: '',
//   sm: '',
//   md: 'h-5 w-10',
//   lg: '',
//   xl: '',
//   xl2: ''
// };
// export const switchFillSizes = {
//   unstyled: '',
//   xs: '',
//   sm: '',
//   md: 'h-4 w-9',
//   lg: '',
//   xl: '',
//   xl2: ''
// };
// export const switchHandleSizes = {
//   unstyled: '',
//   xs: '',
//   sm: '',
//   md: 'h-5 w-5 translate-x-0 group-aria-checked:translate-x-5',
//   lg: '',
//   xl: '',
//   xl2: ''
// };
// export const switchTranslateSizes = {
//   unstyled: '',
//   xs: '',
//   sm: '',
//   md: 'translate-x-0',
//   lg: '',
//   xl: '',
//   xl2: ''
// };
// export const avatarSizes = {
//   unstyled: '',
//   xs: 'h-6 w-6',
//   sm: 'h-8 w-8',
//   md: 'h-10 w-10',
//   lg: 'h-12 w-12',
//   xl: 'h-14 w-14',
//   xl2: 'h-16 w-16',
// };
// export const avatarNotificationSizes = {
//   unstyled: '',
//   xs: 'h-1.5 w-1.5',
//   sm: 'h-2 w-2',
//   md: 'h-2.5 w-2.5',
//   lg: 'h-3 w-3',
//   xl: 'h-3.5 w-3.5',
//   xl2: 'h-4 w-4',
// }
// export const titlePadding = {
//   unstyled: '',
//   xs: 'px-4 py-1.5',
//   sm: 'px-5 py-2',
//   md: 'px-6 py-3',
//   lg: 'px-8 py-4',
//   xl: 'px-10 py-6',
//   xl2: 'px-12 py-8'
// };
// export const paginationGroupedPadding = {
//   unstyled: '',
//   xs: 'px-2.5 py-1',
//   sm: 'px-3.5 py-1.5',
//   md: 'px-4 py-2',
//   lg: 'px-5 py-2.5',
//   xl: 'px-6 py-3',
//   xl2: 'px-7 py-3.5'
// };
// export const paginationFlushedPadding = {
//   unstyled: '',
//   xs: 'px-2.5 pt-2',
//   sm: 'px-3.5 pt-2.5',
//   md: 'px-4 pt-3',
//   lg: 'px-5 pt-3.5',
//   xl: 'px-6 pt-4',
//   xl2: 'px-7 pt-5'
// };
// export const paginationIconSizes = {
//   unstyled: '',
//   xs: 'h-3 w-3',
//   sm: 'h-4 w-4',
//   md: 'h-5 w-5',
//   lg: 'h-6 w-6',
//   xl: 'h-7 w-7',
//   xl2: 'h-8 w-8',
// };
// export const breadcrumbSpacings = {
//   unstyled: '',
//   xs: 'space-x-1',
//   sm: 'space-x-2',
//   md: 'space-x-4',
//   lg: 'space-x-6',
//   xl: 'space-x-8',
//   xl2: 'space-x-10',
// };
// export const breadcrumbMargins = {
//   unstyled: '',
//   xs: 'ml-1',
//   sm: 'ml-2',
//   md: 'ml-4',
//   lg: 'ml-6',
//   xl: 'ml-8',
//   xl2: 'ml-10',
// };
// export const popoverSizes = {
//   unstyled: '',
//   xs: 'px-1.5 text-[10px]',
//   sm: 'px-2 py-1 ' + fontSizes.xs,
//   md: 'px-2.5 py-1.5 ' + fontSizes.sm,
//   lg: 'px-3 py-2 ' + fontSizes.md,
//   xl: 'px-3.5 py-2.5 ' + fontSizes.lg,
//   xl2: 'px-4 py-3 ' + fontSizes.xl
// };
////////////////////////////////////////////
