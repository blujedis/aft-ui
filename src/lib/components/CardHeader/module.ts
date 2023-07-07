import type { CardContentProps } from '../CardContent';

export type CardHeaderProps = Omit<CardContentProps, 'mode'>;

export const cardHeaderDefaults = {};
