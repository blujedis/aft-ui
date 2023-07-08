<script lang="ts">
	import { Button } from '$lib';
</script>

<div class="py-4 px-6">
	<div class="text-xl font-semibold mb-4">Examples</div>

	<div
		class="mb-4 grid grid-cols-6 grid-flow-row grid-rows-3 text-sm underline text-indigo-500 place-items-center"
	>
		<a href="/accordion">Accordion</a>
		<a href="/avatar">Avatar</a>
		<a href="/badge">Badge</a>
		<a href="/breadcrumb">Breadcrumb</a>
		<a href="/button">Buttons</a>
		<a href="/buttongroup">Button Groups</a>
		<a href="/drawer">Drawer</a>
		<a href="/input">Inputs</a>
		<a href="/card">Card</a>
		<a href="/checkbox">Checkboxes</a>
		<a href="/dropdown">Dropdowns</a>
		<a href="/modal">Modals</a>
		<a href="/notification">Notifications</a>
		<a href="/pagination">Pagination</a>
		<a href="/progressbar">Progress Bar</a>
		<a href="/progresscircle">Progress Circle</a>
		<a href="/range">Range</a>
		<a href="/rating">Rating</a>
		<a href="/select">Select</a>
		<a href="/switch">Switch</a>
		<a href="/tab">Tab</a>
	</div>
</div>

<div class="text-center">
	<Button on:click={() => (window.location.href = '/')}>Reload</Button>
</div>
