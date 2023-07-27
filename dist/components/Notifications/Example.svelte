<script>import Notifications, {} from ".";
import notification from "../../stores/notification";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
import SelectRounded from "../_Example/SelectRounded.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import SelectPosition from "../_Example/SelectPosition.svelte";
const title = "Notifications";
const description = "Alert notifications with 6 optional positions.";
const code = `
  `;
let textarea;
const props = {
  position: "top-right",
  rounded: "none",
  shadowed: "none",
  size: "md",
  theme: "light",
  variant: "default"
};
const themes = [
  "light",
  "dark",
  "smoke",
  "primary",
  "secondary",
  "tertiary",
  "danger",
  "success",
  "warning",
  "info"
];
function getRandomNumber(min = 0, max = 7) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getRandomTheme() {
  return themes[getRandomNumber()] || "smoke";
}
function notify() {
  notification.add({
    theme: getRandomTheme(),
    description: textarea.value
  });
}
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<span class="italic">No Toggle Options</span>
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.theme} />
		<SelectSize bind:value={props.size} />
		<SelectRounded bind:value={props.rounded} />
		<SelectShadowed bind:value={props.shadowed} />
		<SelectPosition bind:value={props.position} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-3 gap-4">
		<div>
			<label for="notification" class="flex flex-col"
				><span class="text-sm">Create Notification</span>
				<textarea
					bind:this={textarea}
					id="notification"
					class="text-sm mt-2 p-4"
					placeholder="Enter your Notification message."
				/>
			</label>
			<button
				class="bg-primary-600 hover:bg-primary-500 px-8 py-2 text-white text-sm rounded-sm mt-4"
				on:click={notify}>Notify</button
			>
		</div>
	</div>

	<Notifications position={props.position} />
</ExamplePage>
