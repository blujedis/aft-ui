import { mergeConfigs } from '../theme';
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
export const fieldPaddingY = {
    unstyled: '',
    xs: 'py-0.5',
    sm: 'py-1',
    md: 'py-1.5',
    lg: 'py-2',
    xl: 'py-2.5',
    xl2: 'py-3'
};
export const fieldUpperPaddingY = {
    unstyled: '',
    xs: 'py-1',
    sm: 'py-1.5',
    md: 'pt-2.5 pb-1.5',
    lg: 'py-2.5',
    xl: 'py-3',
    xl2: 'py-3.5'
};
export const fieldPadding = mergeConfigs(fieldPaddingY, {
    unstyled: '',
    xs: 'px-2.5',
    sm: 'px-2.5',
    md: 'px-3',
    lg: 'px-3.5',
    xl: 'px-5',
    xl2: 'px-6'
});
export const buttonPadding = mergeConfigs(fieldPaddingY, {
    unstyled: '',
    xs: 'px-2.5',
    sm: 'px-3',
    md: 'px-4',
    lg: 'px-5',
    xl: 'px-6',
    xl2: 'px-8'
});
export const objectFit = {
    unstyled: '',
    none: 'object-none',
    contain: 'object-contain',
    cover: 'object-cover',
    fill: 'object-fill',
    scaled: 'object-scale-down'
};
export const objectPosition = {
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
// export const focused = {
// 	$base: 'focus:outline-none focus-visible:outline-none',
// 	white: 'focus:ring-white',
// 	default: 'focus:ring-default-500',
// 	primary: 'focus:ring-primary-500',
// 	secondary: 'focus:ring-secondary-500',
// 	tertiary: 'focus:ring-tertiary-500',
// 	danger: 'focus:ring-danger-500',
// 	warning: 'focus:ring-warning-500',
// 	success: 'focus:ring-success-500',
// 	info: 'focus:ring-info-500'
// };
// export const focusedVisible = {
// 	$base: 'focus:outline-none focus-visible:outline-none',
// 	white: 'focus-visible:ring-white',
// 	default: 'focus-visible:ring-default-500',
// 	primary: 'focus-visible:ring-primary-500',
// 	secondary: 'focus-visible:ring-secondary-500',
// 	tertiary: 'focus-visible:ring-tertiary-500',
// 	danger: 'focus-visible:ring-danger-500',
// 	warning: 'focus-visible:ring-warning-500',
// 	success: 'focus-visible:ring-success-500',
// 	info: 'focus-visible:ring-info-500'
// };
export const focused = {
    $base: 'focus:outline-none focus-visible:outline-none',
    white: 'focus:ring-default-100 focus-visible:ring-default-100',
    default: 'focus:ring-default-400 focus-visible:ring-default-400',
    primary: 'focus:ring-primary-600 focus-visible:ring-primary-600',
    secondary: 'focus:ring-secondary-600 focus-visible:ring-secondary-600',
    tertiary: 'focus:ring-tertiary-600 focus-visible:ring-tertiary-600',
    danger: 'focus:ring-danger-600 focus-visible:ring-danger-600',
    warning: 'focus:ring-warning-600 focus-visible:ring-warning-600',
    success: 'focus:ring-success-600 focus-visible:ring-success-600',
    info: 'focus:ring-info-600 focus-visible:ring-info-600'
};
export const focusedVisible = focused;
export const focusedRingSizes = {
    $base: '',
    unstyled: '',
    none: 'focus:ring-0 focus-visible:ring-0',
    one: 'focus:ring-1 focus-visible:ring-1',
    two: 'focus:ring-2 focus-visible:ring-2',
    four: 'focus:ring-4 focus-visible:ring-4',
    eight: 'focus:ring-8 focus-visible:ring-8'
};
export const focusedOffsetSizes = {
    $base: '',
    unstyled: '',
    inset: 'focus:ring-inset focus-visible:ring-inset',
    none: 'focus:ring-offset-0 focus-visible:ring-offset-0',
    one: 'focus:ring-offset-1 focus-visible:ring-offset-1',
    two: 'focus:ring-offset-2 focus-visible:ring-offset-2',
    four: 'focus:ring-offset-4 focus-visible:ring-offset-4',
    eight: 'focus:ring-offset-8 focus-visible:ring-offset-8'
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
    default: 'placeholder:text-default-400 aria-disabled:placeholder:text-default-200',
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
// export const focusedFlush = {
// 	$base: 'focus:outline-none focus:!ring-0 focus-visible:!ring-0',
// 	white: 'focus:border-white focus:shadow-[0_4px_6px_-6px_rgb(var(--color-white))]',
// 	default: 'focus:border-default-500 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-default-500))]',
// 	primary: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-primary-600))]',
// 	secondary: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-secondary-600))]',
// 	tertiary: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-tertiary-600))]',
// 	danger: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-danger-600))]',
// 	warning: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-warning-600))]',
// 	success: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-success-600))]',
// 	info: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-info-600))]'
// };
