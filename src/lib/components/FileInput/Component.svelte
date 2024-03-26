<script lang="ts">
	import { type FileInputProps, fileInputDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type $$Props = FileInputProps & ElementProps<'input'>;

	export let { name, readAs, onFormData, onReadFiles } = {
		...defaults
	} as Required<FileInputProps>;


</script>

