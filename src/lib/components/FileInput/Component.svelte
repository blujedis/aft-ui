<script lang="ts">
	import { type FileInputProps, type FileInputMode, fileInputControllerDefaults as defaults } from './module';
	import type { ElementProps } from '$lib/types';

	type Mode = $$Generic<FileInputMode>
	type $$Props = FileInputProps<Mode>

	export let { name, readAs, onFormData, onReadFiles } = {
		...defaults
	} as Required<FileInputProps<Mode>>;


</script>

