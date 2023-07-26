<script>import Rating from ".";
import RatingItem from "../RatingItem";
import Section from "../_Example/Section.svelte";
import SelectTheme from "../_Example/SelectTheme.svelte";
import SelectShadowed from "../_Example/SelectShadowed.svelte";
import ListOptions from "../_Example/ListOptions.svelte";
import ToggleOptions from "../_Example/ToggleOptions.svelte";
import ExamplePage from "../_Example/ExamplePage.svelte";
import SelectSize from "../_Example/SelectSize.svelte";
const title = "Ratings";
const description = "Rating component that supports custom icons.";
const code = `
  `;
let count = 5;
const props = {
  fill: "warning",
  shadowed: "none",
  size: "sm"
};
</script>

<ExamplePage {title} {description} {code}>
	<ToggleOptions>
		<!-- <Checkbox label="Transition" bind:checked={props.transitioned} /> -->
	</ToggleOptions>
	<ListOptions>
		<SelectTheme bind:value={props.fill} />
		<SelectSize bind:value={props.size} />
		<SelectShadowed bind:value={props.shadowed} />
	</ListOptions>

	<Section>
		<hr />
	</Section>

	<div class="grid grid-cols-4 gap-4">
		<label for="auto">
			<div class="text-sm mb-1">Default:</div>
			{#key props}
				<Rating score={2.5} {...props} />
			{/key}
		</label>

		<label for="user-defined">
			<div class="text-sm mb-1">User Defined:</div>
			<Rating let:mouseover let:mouseleave let:select score={3} updatable>
				{#each Array(count) as r, index}
					<RatingItem
						{index}
						on:mouseover={(e) => mouseover(index, e)}
						on:mouseleave={(e) => mouseleave(index, e)}
						on:click={(e) => select(index, e)}
					/>
				{/each}
			</Rating>
		</label>

		<label for="auto">
			<div class="text-sm mb-1">Readonly:</div>
			<Rating readonly score={4.25} />
		</label>

		<label for="custom-icon">
			<div class="text-sm mb-1">Custom Icon:</div>
			<Rating let:mouseover let:mouseleave let:select fill="danger.600" score={2.7}>
				{#each Array(count) as r, index}
					<RatingItem {index} let:uid let:stops let:classes let:styles let:fill let:stroke>
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<button
							class={classes}
							style={styles}
							on:mouseover={(e) => mouseover(index, e)}
							on:mouseleave={(e) => mouseleave(index, e)}
							on:click={(e) => select(index, e)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
								<defs>
									<linearGradient id={uid}>
										{#each stops as stop}
											<stop {...stop} />
										{/each}
									</linearGradient>
								</defs>
								<path
									{stroke}
									{fill}
									d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
								/>
							</svg>
						</button>
					</RatingItem>
				{/each}
			</Rating>
		</label>
	</div>
</ExamplePage>
