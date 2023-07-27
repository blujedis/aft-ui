// for IE 10 or below add text-frame-400
// as it requires style "color: gray" as an example.
const baseVariant = {
    $base: 'bg-frame-100 [&::-webkit-progress-bar]:bg-frame-200/90',
    white: 'bg-white [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-frame-400 [&::-moz-progress-bar]:bg-frame-400',
    frame: ' [&::-webkit-progress-value]:bg-frame-400 [&::-moz-progress-bar]:bg-frame-400',
    primary: '[&::-webkit-progress-value]:bg-primary-500 [&::-moz-progress-bar]:bg-primary-500',
    secondary: '[&::-webkit-progress-value]:bg-secondary-500 [&::-moz-progress-bar]:bg-secondary-400',
    tertiary: '[&::-webkit-progress-value]:bg-tertiary-500 [&::-moz-progress-bar]:bg-tertiary-400',
    danger: '[&::-webkit-progress-value]:bg-danger-500 [&::-moz-progress-bar]:bg-danger-400',
    warning: '[&::-webkit-progress-value]:bg-warning-500 [&::-moz-progress-bar]:bg-warning-400',
    success: '[&::-webkit-progress-value]:bg-success-500 [&::-moz-progress-bar]:bg-success-400',
    info: '[&::-webkit-progress-value]:bg-info-500 [&::-moz-progress-bar]:bg-info-400'
};
export const progressBar = {
    default: { ...baseVariant },
    filled: { ...baseVariant }
};
