<script>import ExamplePage from "../_Example/ExamplePage.svelte";
import { Menu } from "./";
import { MenuButton } from "../MenuButton";
import { MenuOption } from "../MenuOption";
import { MenuPanel } from "../MenuPanel";
import { colors } from "../../constants";
import { Divider } from "..";
const title = "Menu";
const description = "Dropdown menu examples.";
const sourceItems = [
  {
    value: "java",
    label: "Java",
    description: "Java is a multi-platform, object-oriented, and network-centric language that can be used as a platform in itself. It is a fast, secure, reliable programming language for coding everything from mobile apps and enterprise software to big data applications and server-side technologies.",
    active: false,
    href: "https://www.java.com/en/"
  },
  {
    value: "javascript",
    label: "JavaScript",
    description: "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB and Adobe Acrobat.",
    active: false,
    href: "https://www.javascript.com/"
  },
  {
    value: "python",
    label: "Python",
    description: 'Python is an interpreted, object-oriented, high-level programming language with dynamic semantics developed by Guido van Rossum. It was originally released in 1991. Designed to be easy as well as fun, the name "Python" is a nod to the British comedy group Monty Python.',
    active: false,
    href: "https://www.python.org/"
  },
  {
    value: "react",
    label: "React",
    description: "React is a JavaScript-based UI development library. Facebook and an open-source developer community run it. Although React is a library rather than a language, it is widely used in web development. The library first appeared in May 2013 and is now one of the most commonly used frontend libraries for web development.",
    active: true,
    href: "https://react.dev/"
  },
  {
    value: "svelte",
    label: "Svelte",
    description: "Svelte shifts as much work as possible out of the browser and into your build step. No more manual optimisations \u2014 just faster, more efficient apps.",
    active: false,
    href: "https://svelte.dev/"
  },
  {
    value: "php",
    label: "PHP",
    description: "A popular general-purpose scripting language that is especially suited to web development Fast, flexible and pragmatic, PHP powers everything from your blog to the most popular websites in the world.",
    active: false,
    href: "https://www.php.net/"
  },
  {
    value: "rust",
    label: "Rust",
    description: "Rust is blazingly fast and memory-efficient: with no runtime or garbage collector, it can power performance-critical services, run on embedded devices, and easily integrate with other languages.",
    active: false,
    href: "https://www.rust-lang.org/"
  }
];
const props = {
  hovered: true,
  disabled: false,
  full: false,
  rounded: "none",
  // shadowed: 'none' as ThemeShadowed,
  size: "md",
  theme: "default",
  variant: "filled"
};
</script>

<ExamplePage {title} {description}>
	{#key props}
		{#each colors as color}
			<div class="grid grid-cols-5 gap-2 mb-4">
				<Menu {...props} theme={color}>
					<MenuButton>Languages</MenuButton>
					<MenuPanel>
						{#each sourceItems as item}
							<MenuOption as="a" href={item.href} active={item.active}>{item.label}</MenuOption>
						{/each}
						<Divider />
						<MenuOption as="a" href="https://yahoo.com">Yahoo</MenuOption>
					</MenuPanel>
				</Menu>

				<Menu {...props} variant="outlined" theme={color}>
					<MenuButton>Languages</MenuButton>
					<MenuPanel>
						{#each sourceItems as item}
							<MenuOption as="a" href={item.href} active={item.active}>{item.label}</MenuOption>
						{/each}
					</MenuPanel>
				</Menu>

				<Menu {...props} variant="soft" theme={color}>
					<MenuButton>Languages</MenuButton>
					<MenuPanel>
						{#each sourceItems as item}
							<MenuOption as="a" href={item.href} active={item.active}>{item.label}</MenuOption>
						{/each}
					</MenuPanel>
				</Menu>

				<Menu {...props} variant="ghost" theme={color}>
					<MenuButton>Languages</MenuButton>
					<MenuPanel>
						{#each sourceItems as item}
							<MenuOption as="a" href={item.href} active={item.active}>{item.label}</MenuOption>
						{/each}
					</MenuPanel>
				</Menu>

				<Menu {...props} variant="text" theme={color}>
					<MenuButton>Languages</MenuButton>
					<MenuPanel>
						{#each sourceItems as item}
							<MenuOption as="a" href={item.href} active={item.active}>{item.label}</MenuOption>
						{/each}
					</MenuPanel>
				</Menu>
			</div>
		{/each}
	{/key}
</ExamplePage>
