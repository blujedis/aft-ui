export const tab = {
	flushed: {
		$base: 'border-transparent border-b-2 border-x-0 border-t-0 rounded-br-none rounded-bl-none'
	},
	filled: {
		light: 'aria-selected:text-[color:var(--text-dark)]',
	$base: 'aria-selected:text-white'
	},
	grouped: {
		$base:
		'border border-frame-200 dark:border-black dark:border-opacity-40 aria-selected:text-white',
	light: 'aria-selected:text-[color:var(--text-dark)]'
	},
	labeled: {
		$base:
		'-mb-px border border-transparent aria-selected:border-frame-200 dark:aria-selected:border-black dark:border-opacity-40 aria-selected:border-b-[color:var(--bg-light)] dark:aria-selected:border-b-[color:var(--bg-dark)] aria-selected:font-medium',
	light: 'dark:text-[color:var(--text-light)]',
	dark: 'aria-selected:text-[color:var(--text-dark)] dark:aria-selected:text-[color:var(--text-light)]'
	}
};
