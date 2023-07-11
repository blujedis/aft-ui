import { mergeConfigs } from '../../theme';
import { roundeds } from '../shared';
export const progressBarSizes = {
    unstyled: '',
    xs: 'h-1',
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
    xl: 'h-6',
    xl2: 'h-8'
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
    full: '[&::-webkit-progress-bar]:rounded-full'
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
    full: '[&::-webkit-progress-value]:rounded-full'
};
