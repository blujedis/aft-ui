declare global {
	declare namespace svelte.JSX {
		interface HTMLAttributes {
			onclick_outside: (e: any) => void;
		}
	}
}

export {};
