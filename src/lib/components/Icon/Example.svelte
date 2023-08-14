<script lang="ts">
	import { Icon } from '.';
	import { colors } from '$lib/constants';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';

	const title = 'Icon';
	const description = 'Iconify extended icon.';
	const code = `
  `;
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-4 gap-4">
		<Icon icon="mdi-light:home" size="xs" />
		<Icon icon="mdi-light:home" size="sm" />
		<Icon icon="mdi:account-box" size="md" class="text-slate-400" />
		<Icon icon="mdi-light:home" size="lg" />
		<Icon icon="mdi-light:home" size="xl" />
		<Icon icon="mdi-light:home" size="xl2" />
	</div>
</ExamplePage>
