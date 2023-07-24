import type { CardContentProps } from '../CardContent';

export type CardHeaderProps = Omit<CardContentProps, 'type'>;

export const cardHeaderDefaults = {};
