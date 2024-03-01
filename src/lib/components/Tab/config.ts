export const tab = {
	soft: {},
	flushed: {
		$base: 'border-transparent border-b-2 border-x-0 border-t-0 rounded-br-none rounded-bl-none'
	},

	filled: {
		default: 'aria-selected:text-[color:var(--text-dark)]',
		$base: 'aria-selected:text-white'
	},

	outlined: {
		$base:
			'border border-frame-200 dark:border-black dark:border-opacity-40 aria-selected:text-white',
		default: 'aria-selected:text-[color:var(--text-dark)]'
	},

	text: {
		$base:
			'-mb-px border border-transparent aria-selected:border-frame-200 dark:aria-selected:border-black dark:border-opacity-40 aria-selected:border-b-[color:var(--bg-light)] dark:aria-selected:border-b-[color:var(--bg-dark)] aria-selected:font-medium',
		default: 'dark:text-[color:var(--text-light)]',
		dark: 'aria-selected:text-[color:var(--text-dark)] dark:aria-selected:text-[color:var(--text-light)]'
	}
};
