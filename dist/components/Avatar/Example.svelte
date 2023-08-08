<script>import { Avatar } from ".";
import { AvatarStack } from "../AvatarStack";
import ExamplePage from "../_Example/ExamplePage.svelte";
const title = "Avatar";
const description = `Avatar element with or without stacked groups.`;
const code = `
  `;
const props = {
  animation: void 0,
  notification: false,
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  variant: "single",
  direction: "up"
};
const urls = [
  "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
];
</script>

<ExamplePage {title} {description} {code}>
	<div class="grid grid-cols-5 gap-4 mb-4">
		<div>
			<Avatar src={urls[0]} alt="" {...props} />
		</div>
		<div>
			<Avatar src={urls[1]} alt="" {...props} theme="primary" notification />
		</div>
		<div>
			<Avatar src={urls[2]} alt="" {...props} theme="success" notification />
		</div>
		<div>
			<Avatar src={urls[3]} alt="" {...props} theme="danger" notification />
		</div>
		<div>
			<Avatar src={urls[3]} alt="" {...props} placeholder />
		</div>
	</div>
	<div>
		{#key props}
			<AvatarStack {...props}>
				{#each urls as url}
					<Avatar src={url} alt="" />
				{/each}
			</AvatarStack>
		{/key}
	</div>
</ExamplePage>
