<script lang="ts">
	interface SidebarLink {
		name: string;
		link: string;
	}

	export let sidebarLinks: SidebarLink[];

    let backroundStyle = "w-1/6 bg-[#282828] h-full flex justify-left pl-10 pt-6 text-lg";
    let verticalStyle = "flex flex-col gap-2"
    let heightStyle = "flex flex-col h-screen"
    let heightStyle2 = "overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-0 h-full"
</script>

<div class={heightStyle}>
	<main class={heightStyle2}>
		<aside class={backroundStyle}>
			<nav class={verticalStyle}>
				{#each sidebarLinks as sideLink}
					<a href={sideLink.link} class="text-[#CBD5E1]"> {sideLink.name} </a>
				{/each}
			</nav>
		</aside>
	</main>
</div>
