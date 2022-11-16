<script lang="ts">
	import PageHeader from './PageHeader.svelte';

	// Common
	export let title = '';
	export let description = '';
	export let url = '';
	export let image = '';
	export let mime = 'image/png';

	// Twitter
	export let type = 'article';
	export let card = 'summary';
	export let site = '@';
	export let creator = '@';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<!-- Twitter -->
	<meta name="twitter:card" content={card} />
	<meta name="twitter:site" content={site} />
	<meta name="twitter:creator" content={creator} />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />

	<!-- Facebook -->
	<meta
		property="og:url"
		content={url || (typeof window !== 'undefined' && window.location.href) || '/'}
	/>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:type" content={type} />
	<meta property="og:image" content={image} />
	<meta property="og:image:type" content={mime} />
</svelte:head>

<div class="p-8 w-full">
	<PageHeader {title} {description} />
	<slot />
</div>
