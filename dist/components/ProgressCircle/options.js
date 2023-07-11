// Should we use Tailwind width classes here and parse?
// seems like overkill.
// 1rem * 16 = 16 / 4 = w-4
// xs: 'w-6', // w-6 1.5rem 24px
// sm: 'w-14', // w-14 3.4rem 56px
// md: 'w-20', // w-20 5rem 80px
// lg: 'w-24', // w-24 6rem 96px
// xl: 'w-36',  // w-36 9rem 144px
// xl2: 'w-48', // w-48 12rem 192px
export const progressCircleSizes = {
    unstyled: 0,
    xs: 42,
    sm: 75,
    md: 100,
    lg: 125,
    xl: 150,
    xl2: 175
};
export const progressCircleTextSizes = {
    unstyled: '',
    xs: 'text-[10px]',
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    xl2: 'text-2xl'
};
// IMPORTANT: Use number or tailwind width only ONLY!!!
export const progressCircleTrackSizes = {
    unstyled: 0,
    xs: 4,
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
    xl2: 14
};
