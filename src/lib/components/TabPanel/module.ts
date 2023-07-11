import type { SelectValue } from '../../stores/select';

export type TabPanelProps = {
	value: SelectValue;
	unmount?: boolean;
};

export const tabPanelDefaults: Partial<TabPanelProps> = {
	unmount: true
};
