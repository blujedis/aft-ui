const rangeTrackBackgroundBase = {
	white: '',
	frame: 'bg-frame-200',
	primary: 'bg-frame-200',
	secondary: 'bg-frame-200',
	tertiary: 'bg-frame-200',
	danger: 'bg-frame-200',
	warning: 'bg-frame-200',
	success: 'bg-frame-200',
	info: 'bg-frame-200'
};

const rangeTrackAccentBase = {
	white: '',
	frame: 'accent-frame-400',
	primary: 'accent-primary-500',
	secondary: 'accent-secondary-500',
	tertiary: 'accent-tertiary-500',
	danger: 'accent-danger-500',
	warning: 'accent-warning-500',
	success: 'accent-success-500',
	info: 'accent-info-500'
};

const rangeThumbBorderBase = {
	white: '',
	frame: 'border-frame-400',
	primary: 'border-primary-500',
	secondary: 'border-secondary-500',
	tertiary: 'border-tertiary-500',
	danger: 'border-danger-500',
	warning: 'border-warning-500',
	success: 'border-success-500',
	info: 'border-info-500'
};

const rangeThumbBackgroundBase = {
	white: 'bg-white',
	frame: 'bg-white',
	primary: 'bg-white',
	secondary: 'bg-white',
	tertiary: 'bg-white',
	danger: 'bg-white',
	warning: 'bg-white',
	success: 'bg-white',
	info: 'bg-white'
};

export const rangeTrackBackground = {
	default: { ...rangeTrackBackgroundBase },
	filled: { ...rangeTrackBackgroundBase }
};

export const rangeTrackAccent = {
	default: { ...rangeTrackAccentBase },
	filled: { ...rangeTrackAccentBase }
};

export const rangeThumbBorder = {
	default: { ...rangeThumbBorderBase },
	filled: { ...rangeThumbBorderBase }
};

export const rangeThumbBackground = {
	default: { ...rangeThumbBackgroundBase },
	filled: { ...rangeThumbBackgroundBase }
};
