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
export const fieldPaddingTightY = {
    unstyled: '',
    xs: 'py-px',
    sm: 'py-0.5',
    md: 'py-1',
    lg: 'py-1.5',
    xl: 'py-2',
    xl2: 'py-2.5'
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
export const fieldPaddingX = {
    unstyled: '',
    xs: 'px-2.5',
    sm: 'px-2.5',
    md: 'px-3',
    lg: 'px-3.5',
    xl: 'px-5',
    xl2: 'px-6'
};
export const fieldPadding = mergeConfigs(fieldPaddingY, fieldPaddingX);
export const buttonPadding = mergeConfigs(fieldPaddingY, {
    unstyled: '',
    xs: 'px-2.5',
    sm: 'px-3',
    md: 'px-4',
    lg: 'px-5',
    xl: 'px-6',
    xl2: 'px-8'
});
export const menuPadding = mergeConfigs(fieldPaddingTightY, {
    unstyled: '',
    xs: 'px-2',
    sm: 'px-2',
    md: 'px-2.5',
    lg: 'px-3',
    xl: 'px-4',
    xl2: 'px-5'
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
export const focusedBorder = {
    $base: 'focus:outline-none focus-visible:outline-none focus-within:outline-none focus:ring-0 focus-visible:ring-0 focus-within:ring-0',
    dark: 'focus:border-frame-800 focus-visible:border-frame-800 focus-within:border-frame-800',
    light: 'focus:border-frame-400 focus-visible:border-frame-400 focus-within:border-frame-400',
    primary: 'focus:border-primary-600 focus-visible:border-primary-600 focus-within:border-primary-600',
    secondary: 'focus:border-secondary-600 focus-visible:border-secondary-600 focus-within:border-secondary-600',
    tertiary: 'focus:border-tertiary-600 focus-visible:border-tertiary-600 focus-within:border-tertiary-600',
    danger: 'focus:border-danger-600 focus-visible:border-danger-600 focus-within:border-danger-600',
    warning: 'focus:border-warning-600 focus-visible:border-warning-600 focus-within:border-warning-600',
    success: 'focus:border-success-600 focus-visible:border-success-600 focus-within:border-success-600',
    info: 'focus:border-info-600 focus-visible:border-info-600 focus-within:border-info-600'
};
export const focusedBorderSizes = {
    $base: '',
    unstyled: '',
    none: 'focus:border-0 focus-visible:border-0 focus-visible:border-0',
    one: 'focus:border-1 focus-visible:border-1 focus-visible:border-1',
    two: 'focus:border-2 focus-visible:border-2 focus-visible:border-2',
    four: 'focus:border-4 focus-visible:border-4 focus-visible:border-4',
    eight: 'focus:border-8 focus-visible:border-8 focus-visible:border-8'
};
export const focusedBorderFlushSizes = {
    $base: '',
    unstyled: '',
    none: 'focus:border-b-0 focus-visible:border-b-0 focus-within:border-b-0',
    one: 'focus:border-b-1 focus-visible:border-b-1 focus-within:border-b-1',
    two: 'focus:border-b-2 focus-visible:border-b-2 focus-within:border-b-2',
    four: 'focus:border-b-4 focus-visible:border-b-4 focus-within:border-b-4',
    eight: 'focus:border-b-8 focus-visible:border-b-8 focus-within:border-b-8'
};
export const focusedOutline = {
    $base: 'focus:outline focus-visible:outline focus:ring-0 focus-visible:ring-0 focus-within:ring-0',
    dark: 'focus:outline-frame-800 focus-visible:outline-frame-800 focus-within:outline-frame-800',
    light: 'focus:outline-frame-400 focus-visible:outline-frame-400 focus-within:outline-frame-400',
    primary: 'focus:outline-primary-600 focus-visible:outline-primary-600 focus-within:outline-primary-600',
    secondary: 'focus:outline-secondary-600 focus-visible:outline-secondary-600 focus-within:outline-secondary-600',
    tertiary: 'focus:outline-tertiary-600 focus-visible:outline-tertiary-600 focus-within:outline-tertiary-600',
    danger: 'focus:outline-danger-600 focus-visible:outline-danger-600 focus-within:outline-danger-600',
    warning: 'focus:outline-warning-600 focus-visible:outline-warning-600 focus-within:outline-warning-600',
    success: 'focus:outline-success-600 focus-visible:outline-success-600 focus-within:outline-success-600',
    info: 'focus:outline-info-600 focus-visible:outline-info-600 focus-within:outline-info-600'
};
export const focusedOutlineSizes = {
    $base: '',
    unstyled: '',
    none: 'focus:outline-0 focus-visible:outline-0 focus-visible:outline-0',
    one: 'focus:outline-1 focus-visible:outline-1 focus-visible:outline-1',
    two: 'focus:outline-2 focus-visible:outline-2 focus-visible:outline-2',
    four: 'focus:outline-4 focus-visible:outline-4 focus-visible:outline-4',
    eight: 'focus:outline-8 focus-visible:outline-8 focus-visible:outline-8'
};
export const focusedOutlineOffsetSizes = {
    $base: '',
    unstyled: '',
    none: 'focus:outline-offset-0 focus-visible:outline-offset-0 focus-within:outline-offset-0',
    one: 'focus:outline-offset-1 focus-visible:outline-offset-1 focus-within:outline-offset-1',
    two: 'focus:outline-offset-2 focus-visible:outline-offset-2 focus-within:outline-offset-2',
    four: 'focus:outline-offset-4 focus-visible:outline-offset-4 focus-within:outline-offset-4',
    eight: 'focus:outline-offset-8 focus-visible:outline-offset-8 focus-within:outline-offset-8'
};
export const focused = mergeConfigs(focusedOutline, focusedBorder, {
    $base: 'focus:outline-none focus-visible:outline-none focus-within:outline-none',
    dark: 'focus:ring-frame-800 focus-visible:ring-frame-800 focus-within:ring-frame-800',
    light: 'focus:ring-frame-400 focus-visible:ring-frame-400 focus-within:ring-frame-400',
    primary: 'focus:ring-primary-600 focus-visible:ring-primary-600 focus-within:ring-primary-600',
    secondary: 'focus:ring-secondary-600 focus-visible:ring-secondary-600 focus-within:ring-secondary-600',
    tertiary: 'focus:ring-tertiary-600 focus-visible:ring-tertiary-600 focus-within:ring-tertiary-600',
    danger: 'focus:ring-danger-600 focus-visible:ring-danger-600 focus-within:ring-danger-600',
    warning: 'focus:ring-warning-600 focus-visible:ring-warning-600 focus-within:ring-warning-600',
    success: 'focus:ring-success-600 focus-visible:ring-success-600  focus-within:ring-success-600',
    info: 'focus:ring-info-600 focus-visible:ring-info-600 focus-within:ring-info-600'
});
export const focusedRingSizes = mergeConfigs({
    $base: '',
    unstyled: '',
    inset: 'focus:ring-inset focus-visible:ring-inset focus-within:ring-inset',
    none: 'focus:ring-0 focus-visible:ring-0 focus-within:ring-0',
    one: 'focus:ring-1 focus-visible:ring-1 focus-within:ring-1',
    two: 'focus:ring-2 focus-visible:ring-2 focus-within:ring-2',
    four: 'focus:ring-4 focus-visible:ring-4 focus-within:ring-4',
    eight: 'focus:ring-8 focus-visible:ring-8 focus-within:ring-8'
}, focusedBorderSizes, focusedOutlineSizes);
export const focusedOffsetSizes = mergeConfigs({
    $base: '',
    unstyled: '',
    inset: 'focus:ring-inset focus-visible:ring-inset focus-within:ring-inset',
    none: 'focus:ring-offset-0 focus-visible:ring-offset-0 focus-within:ring-offset-0',
    one: 'focus:ring-offset-1 focus-visible:ring-offset-1 focus-within:ring-offset-1',
    two: 'focus:ring-offset-2 focus-visible:ring-offset-2 focus-within:ring-offset-2',
    four: 'focus:ring-offset-4 focus-visible:ring-offset-4 focus-within:ring-offset-4',
    eight: 'focus:ring-offset-8 focus-visible:ring-offset-8 focus-within:ring-offset-8'
}, focusedOutlineOffsetSizes);
export const focusedFilters = {
    always: [
        '!focus:outline-none',
        'focus-visible:',
        'focus-within:',
        'focus:border',
        'focus:outline'
    ],
    visible: ['focus:', 'focus-within:', 'focus-visible:border', 'focus-visible:outline'],
    within: ['focus:', 'focus-visible:', 'focus-within:border', 'focus-within:outline'],
    alwaysWithin: [
        'focus-visible:',
        'focus:border',
        'focus:outline',
        'focus-within:border',
        'focus-within:outline'
    ],
    visibleWithin: [
        'focus:',
        'focus-visible:border',
        'focus-visible:outline',
        'focus-within:border',
        'focus-within:outline'
    ],
    border: ['focus-visible:', 'focus-within:', 'focus-outline:', 'focus:ring'],
    outline: ['focus-visible:', 'focus-within:', 'focus-outline:', 'focus:border'],
    borderWithin: [
        'focus-visible:',
        'focus:ring',
        'focus:outline',
        'focus-within:outline',
        'focus-within:ring'
    ],
    outlineWithin: [
        'focus-visible:',
        'focus:ring',
        'focus:border',
        'focus-within:border',
        'focus-within:ring'
    ]
};
export const disableds = {
    $base: 'aria-disabled:saturate-50 aria-disabled:brightness-95 aria-disabled:pointer-events-none',
    dark: 'aria-disabled:text-frame-700',
    light: 'aria-disabled:text-frame-300',
    primary: 'aria-disabled:text-primary-300',
    secondary: 'aria-disabled:text-secondary-300',
    tertiary: 'aria-disabled:text-tertiary-300',
    danger: 'aria-disabled:text-danger-300',
    warning: 'aria-disabled:text-warning-300',
    success: 'aria-disabled:text-success-300',
    info: 'aria-disabled:text-info-300'
};
export const placeholders = {
    dark: 'placeholder:text-frame-500 aria-disabled:placeholder:text-frame-500',
    light: 'placeholder:text-frame-400 aria-disabled:placeholder:text-frame-200',
    primary: 'placeholder:text-primary-400 aria-disabled:placeholder:text-primary-300',
    secondary: 'placeholder:text-secondary-400 aria-disabled:placeholder:text-secondary-300',
    tertiary: 'placeholder:text-tertiary-400 aria-disabled:placeholder:text-tertiary-300',
    danger: 'placeholder:text-danger-400 aria-disabled:placeholder:text-danger-430',
    warning: 'placeholder:text-warning-400 aria-disabled:placeholder:text-warning-300',
    success: 'placeholder:text-success-400 aria-disabled:placeholder:text-success-300',
    info: 'placeholder:text-info-400 aria-disabled:placeholder:text-info-300'
};
export const iconCaretSizes = {
    unstyled: '',
    xs: 'h-3 w-3',
    sm: 'h-3.5 w-3.5',
    md: 'h-4 w-4',
    lg: 'h-4 w-4',
    xl: 'h-5 w-5',
    xl2: 'h-6 w-6'
};
export const common = {
    active: 'active:brightness-125',
    transition: 'transition-colors duration-125',
    untransition: 'motion-reduce:transition-none'
};
// export const focusedFlush = {
// 	$base: 'focus:outline-none focus:!ring-0 focus-visible:!ring-0',
// 	dark: 'focus:border-white focus:shadow-[0_4px_6px_-6px_rgb(var(--color-white))]',
// 	light: 'focus:border-frame-500 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-frame-500))]',
// 	primary: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-primary-600))]',
// 	secondary: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-secondary-600))]',
// 	tertiary: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-tertiary-600))]',
// 	danger: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-danger-600))]',
// 	warning: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-warning-600))]',
// 	success: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-success-600))]',
// 	info: 'focus:border-primary-600 focus:shadow-[0_4px_6px_-6px_rgb(var(--color-info-600))]'
// };
