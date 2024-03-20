import { mergeConfigs } from '../../theme';
import { roundeds } from '../../constants/options';
export const progressBarSizes = {
    unstyled: '',
    xs: 'h-0.5',
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2.5',
    xl: 'h-3',
    xl2: 'h-4'
};
// Firefox requires default rounding without pseudo selector.
// merge it with webkit pseudos.
export const progressBarRoundedBar = mergeConfigs(roundeds, {
    unstyled: '',
    none: 'rounded-none',
    xs: '[&::-webkit-progress-bar]:rounded-small',
    sm: '[&::-webkit-progress-bar]:rounded',
    md: '[&::-webkit-progress-bar]:rounded-md',
    lg: '[&::-webkit-progress-bar]:rounded-lg',
    xl: '[&::-webkit-progress-bar]:rounded-xl',
    xl2: '[&::-webkit-progress-bar]:rounded-2xl',
    full: '[&::-webkit-progress-bar]:rounded-full',
    true: '[&::-webkit-progress-bar]:rounded',
    false: 'rounded-none'
});
// webkit requires pseudo selector to round values.
export const progressBarRoundedValue = {
    unstyled: '',
    none: 'rounded-none',
    xs: '[&::-webkit-progress-value]:rounded-small',
    sm: '[&::-webkit-progress-value]:rounded',
    md: '[&::-webkit-progress-value]:rounded-md',
    lg: '[&::-webkit-progress-value]:rounded-lg',
    xl: '[&::-webkit-progress-value]:rounded-xl',
    xl2: '[&::-webkit-progress-value]:rounded-2xl',
    full: '[&::-webkit-progress-value]:rounded-full',
    true: '[&::-webkit-progress-value]:rounded',
    false: 'rounded-none'
};
