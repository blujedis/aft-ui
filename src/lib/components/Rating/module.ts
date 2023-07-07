import type { ThemeShadowed } from '$lib/theme';
import type { Writable } from 'svelte/store';
import type { RatingItemProps } from '../RatingItem/module';
import { ratingDefaults } from '../RatingItem/module';

type OmittedRatingProps = 'index';

export type RatingStoreValue = {
	active: number;
	readonly: boolean;
	score: number;
	selected: number;
};

export type RatingContext = Writable<RatingStoreValue> & {
	globals: Omit<RatingItemProps, OmittedRatingProps>;
	events: {
		handleCleanup: (e: Event) => void;
	};
};

export type RatingProps = Omit<RatingItemProps, OmittedRatingProps> & {
	arrowable?: boolean;
	hoverable?: boolean;
	count?: number;
	readonly?: boolean; // when true no events presentation only.
	shadowed?: ThemeShadowed;
	score?: number; // > 0 and <= count.
	updatable?: boolean;
};

export const ratingControllerDefaults: RatingProps = {
	...ratingDefaults,
	arrowable: true,
	count: 5,
	hoverable: true,
	score: 0
};
