// [Theme Colors]
//
// bg:            500 | 500
// bgHover:       600 | 600
// text:          500 | 500
// textHover:     700 | 700
// border:        500 | 500
// borderHover:   600 | 600
// ring:          500 | 500
// ringHover:     600 | 600
// accent:        secondary.600 | secondary.600
// muted:         300 | 300
// disabed:       200 | 200

// [White]
//
// bg:            white | white
// bgHover:       frame.100 | frame.100
// text:          frame.800 | frame.800
// textHover:     frame.950 | frame.950
// border:        white | white
// borderHover:   frame.100 | frame.100
// ring:          white | white
// ringHover:     frame.100 | frame.100
// accent:        secondary.600 | secondary.600
// muted:         frame.400 | frame.400
// disabed:       frame.300 | frame.300

// [Light]
//
// bg:            frame.100 | frame.100
// bgHover:       frame.200 | frame.200
// text:          frame.800 | frame.800
// textHover:     frame.950 | frame.950
// border:        frame.100 | frame.100
// borderHover:   frame.200 | frame.200
// ring:          frame.100 | frame.100
// ringHover:     frame.200 | frame.200
// accent:        secondary.600 | secondary.600
// muted:         frame.400 | frame.400
// disabed:       frame.300 | frame.300

// [Dark]
//
// bg:            frame.600 | frame.600
// bgHover:       frame.700 | frame.700
// text:          frame.800 | frame.800
// textHover:     frame.950 | frame.950
// border:        frame.600 | frame.600
// borderHover:   frame.700 | frame.700
// ring:          frame.600 | frame.600
// ringHover:     frame.700 | frame.700
// accent:        secondary.600 | secondary.600
// muted:         frame.400 | frame.400
// disabed:       frame.400 | frame.400

const dark = {
	filled: {
		bg: ['frame.600', 'frame.600'],
		bgHover: ['frame.700', 'frame.700'],
		text: ['frame.100', 'frame.100'],
		textHover: ['', ''],
		border: ['frame.600', 'frame.600'],
		borderHover: ['frame.700', 'frame.700'],
		focused: [],
		accent: ['secondary.500', 'secondary.500'],
		muted: ['frame.300', 'frame.300'],
		disabled: ['frame.400', 'frame.400']
	},
	outlined: {
		bg: ['', ''],
		bgHover: ['frame.50', 'frame.700'],
		text: ['--color-text-dark', '--color-text-light'],
		textHover: ['--color-text-dark-hover', '--color-text-light-hover'],
		border: ['frame.600', 'frame.600'],
		borderHover: ['frame.800', 'frame.500'],
		accent: ['secondary.500', 'secondary.500'],
		muted: ['frame.400', 'frame.400'],
		disabled: ['frame.300', 'frame.500']
	},
	panel: {
		bg: ['', 'frame.700'],
		bgHover: ['', ''],
		text: ['--color-text-dark', '--color-text-light'],
		textHover: ['--color-text-dark-hover', '--color-text-light-hover'],
		border: ['frame.600', 'frame.600'],
		borderHover: ['frame.800', 'frame.500'],
		accent: ['secondary.500', 'secondary.500'],
		muted: ['frame.400', 'frame.400'],
		disabled: ['frame.300', 'frame.500']
	},
	row: {
		bg: ['', ''],
		bgHover: ['frame.600', 'frame.800'],
		text: ['frame.700', 'frame.100'],
		textHover: ['frame.900', 'frame.300'],
		border: ['frame.600', 'frame.600'],
		borderHover: ['frame.800', 'frame.500'],
		accent: ['secondary.500', 'secondary.500'],
		muted: ['frame.400', 'frame.400'],
		disabled: ['frame.300', 'frame.500']
	}
};

// const map2 = {
//   color: "primary",
//   type: "bg",
//   shades: [500, 800],
//   modifiers: {
//     hover: [600, 900],
//     focus: [600, 900]
//   },
//   overrides: {},
// };
