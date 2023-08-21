<script lang="ts">
	import { Avatar, type AvatarVariant } from '.';
	import { AvatarStack } from '../AvatarStack';
	import type { ThemeColor, ThemeRounded, ThemeShadowed, ThemeSize } from '../../types';
	import ExamplePage from '../_Example/ExamplePage.svelte';
	import { colors } from '$lib/constants';

	const title = 'Avatar';
	const description = `Avatar element with or without stacked groups.`;
	const code = `
  `;

	const props = {
		animation: undefined as 'ping' | 'pulse' | undefined,
		notification: false,
		rounded: 'none' as ThemeRounded,
		shadowed: 'none' as ThemeShadowed,
		size: 'md' as ThemeSize,
		theme: 'default' as ThemeColor,
		variant: 'single' as AvatarVariant,
		direction: 'up' as 'up' | 'down'
	};

	const urls = [
		'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
		'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80',
		'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
	];
</script>

<ExamplePage {title} {description} {code}>
	<!-- <Avatar src="" alt="" variant="ghost" placeholder /> -->

	<div class="text-2xl font-semibold mb-4">Filled w/ Notification</div>
	<div class="grid grid-cols-9 gap-4 mb-4">
		{#each colors as color, i}
			<Avatar
				src={urls[i] || urls[2]}
				alt=""
				variant="filled"
				theme={color}
				notification
				animate="ping"
			/>
		{/each}
	</div>

	<div class="text-2xl font-semibold mb-4">Outlined w/ Notification</div>
	<div class="grid grid-cols-9 gap-4 mb-4">
		{#each colors as color, i}
			<Avatar src={urls[i] || urls[2]} alt="" variant="outlined" theme={color} notification />
		{/each}
	</div>

	<div class="text-2xl font-semibold mb-4">Ghost w/ Notification</div>
	<div class="grid grid-cols-9 gap-4 mb-4">
		{#each colors as color, i}
			<Avatar
				src={urls[i] || urls[2]}
				alt=""
				variant="ghost"
				theme={color}
				notification
				animate="pulse"
			/>
		{/each}
	</div>

	<div class="text-2xl font-semibold mb-4">Placeholders <span class="text-xs">(Filled)</span></div>
	<div class="grid grid-cols-9 gap-4 mb-4">
		{#each colors as color, i}
			<Avatar src="" alt="" variant="filled" theme={color} placeholder />
		{/each}
	</div>

	<div class="text-2xl font-semibold mb-4">
		Placeholders <span class="text-xs">(Outlined)</span>
	</div>
	<div class="grid grid-cols-9 gap-4 mb-4">
		{#each colors as color, i}
			<Avatar src="" alt="" variant="outlined" theme={color} placeholder />
		{/each}
	</div>

	<div class="text-2xl font-semibold mb-4">Placeholders <span class="text-xs">(Ghost)</span></div>
	<div class="grid grid-cols-9 gap-4 mb-4">
		{#each colors as color, i}
			<Avatar src="" alt="" variant="ghost" theme={color} placeholder />
		{/each}
	</div>

	<div class="grid grid-cols-2 gap-4">
		<div>
			<div class="text-2xl font-semibold mb-4">Basic Avatar</div>
			<Avatar src={urls[0]} alt="" />
		</div>
		<div>
			<div class="text-2xl font-semibold mb-4">Avatar Stack</div>
			{#key props}
				<AvatarStack direction="up">
					{#each urls as url}
						<Avatar src={url} alt="" />
					{/each}
				</AvatarStack>
			{/key}
		</div>
	</div>
</ExamplePage>
