import type { SelectStoreValue } from '../../stores/select';

export type TabPanelProps = {
	value: SelectStoreValue;
	unmount?: boolean;
};

export const tabPanelDefaults: Partial<TabPanelProps> = {
	unmount: true
};
