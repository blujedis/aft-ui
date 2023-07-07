import type { AvatarProps } from '../Avatar/module';

export interface AvatarStackContext {
	globals: AvatarProps;
}

export type AvatarStackProps = Partial<AvatarProps> & {
	// up = each to right on top of previous.
	// down = each to right below the previous.
	direction?: 'up' | 'down';
};

export const avatarStackDefaults: Partial<AvatarStackProps> = {
	direction: 'up'
};
