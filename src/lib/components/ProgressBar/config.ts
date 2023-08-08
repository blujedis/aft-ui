// for IE 10 or below add text-frame-400
// as it requires style "color: gray" as an example.
const baseVariant = {
	$base:
		'bg-frame-100 [&::-webkit-progress-bar]:bg-frame-200/50 dark:bg-frame-600 dark:[&::-webkit-progress-bar]:bg-frame-600', // required for firefox.
	white:
		'bg-white [&::-webkit-progress-bar]:bg-white [&::-webkit-progress-value]:bg-frame-200 [&::-moz-progress-bar]:bg-frame-200',
	light: '[&::-webkit-progress-value]:bg-frame-300 [&::-moz-progress-bar]:bg-frame-300',
	dark: '[&::-webkit-progress-value]:bg-frame-600 [&::-moz-progress-bar]:bg-frame-600 dark[&::-webkit-progress-value]:bg-frame-700 dark[&::-moz-progress-bar]:bg-frame-700',
	primary: '[&::-webkit-progress-value]:bg-primary-500 [&::-moz-progress-bar]:bg-primary-500',
	secondary: '[&::-webkit-progress-value]:bg-secondary-500 [&::-moz-progress-bar]:bg-secondary-500',
	tertiary: '[&::-webkit-progress-value]:bg-tertiary-500 [&::-moz-progress-bar]:bg-tertiary-500',
	danger: '[&::-webkit-progress-value]:bg-danger-500 [&::-moz-progress-bar]:bg-danger-500',
	warning: '[&::-webkit-progress-value]:bg-warning-500 [&::-moz-progress-bar]:bg-warning-500',
	success: '[&::-webkit-progress-value]:bg-success-500 [&::-moz-progress-bar]:bg-success-500',
	info: '[&::-webkit-progress-value]:bg-info-500 [&::-moz-progress-bar]:bg-info-500'
};

export const progressBar = {
	filled: { ...baseVariant }
};
