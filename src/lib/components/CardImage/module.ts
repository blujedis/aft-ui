import type { ImageProps } from '../Image/module';

export type CardImageProps = ImageProps & {
	imageClasses?: string;
};

export const cardImageDefaults: Partial<CardImageProps> = {
	full: true,
	fit: 'cover'
};
