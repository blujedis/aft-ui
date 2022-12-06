<script lang="ts">
	import { page } from '$app/stores';
	import { pathIncludes } from '$docs/utils';
	import { classnames } from '@forewind/util';
	import { borderColor } from './constants';

	const started = [{ title: '', path: '/' }];

	const sidebar = [
		[
			'Getting Started',
			[
				{ title: 'Introduction', path: '/started/into' },
				{ title: 'Quickstart', path: '/started/quick' },
				{ title: 'Svelte', path: '/started/svelte' },
				{
					title: 'License',
					path: 'https://github.com/blujedis/forewind/LICENSE.md',
					target: '_blank'
				},
				{
					title: 'Change Log',
					path: 'https://github.com/blujedis/forewind/CHANGElOG.md',
					target: '_blank'
				}
			]
		],
		[
			'Components',
			[
				{ title: 'Badge', path: '/components/badge' },
				{ title: 'Button', path: '/components/button' },
				{ title: 'Checkbox', path: '/components/checkbox' },
				{ title: 'Combobox', path: '/components/combobox' },
				{ title: 'Icon', path: '/components/icon' },
				{ title: 'Input', path: '/components/input' },
				{ title: 'Kbd', path: '/components/kbd' },
				{ title: 'Label', path: '/components/label' },
				{ title: 'Radio', path: '/components/radio' },
				{ title: 'Select', path: '/components/select' },
				{ title: 'Slider', path: '/components/slider' },
				{ title: 'Switcher', path: '/components/switcher' },
				{ title: 'Text', path: '/components/text' },
				{ title: 'Textarea', path: '/components/textarea' },
			]
		],
		['Customization', [{ title: 'Theme', path: '/customize/theme' }]]
	] as [string, { title: string; path: string; target?: string }[]][];
</script>

<div class={classnames('mh-full overflow-y-scroll overflow-x-hidden border-r', borderColor)}>
	<aside
		class="max-h-[600px] text-sm transition-all duration-300 ease-in-out  dark:text-white w-48"
	>
		{#each sidebar as [title, items]}
			<div class="flex flex-row items-center bg-slate-100 dark:bg-slate-900  h-10  dark:text-white">
				<span class="flex-1 px-4 font-bold text-slate-600 dark:text-white">
					{title}
				</span>
			</div>

			<ul class="mb-3">
				{#each items as item}
					<li class="h-10 px-4 text-slate-700 dark:text-slate-300">
						<a
							href={item.path}
							class="h-10 leading-10 w-full inline-block align-middle hover:font-medium transition-all ease-in-out {pathIncludes(
								item.path,
								$page.url.pathname
							)
								? 'pointer-events-none text-primary-500 font-medium'
								: ''}"
						>
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		{/each}
	</aside>
</div>
