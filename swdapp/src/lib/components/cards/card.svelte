<script lang="ts">
    console.warn("WARNING: The Card component is experimental")
    import { createEventDispatcher } from "svelte";

    export let darkMode: boolean = false;
    export let btnName: string = "Details";
    export let btnVisible: boolean = true;
    export let cardID: string;

    let cardBackgroundStyle = `flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 mr-2`;
    let cardButtonStyle = `
        mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none
    `;

    if (darkMode) {
		cardBackgroundStyle =
			cardBackgroundStyle + ' dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]';
		cardButtonStyle =
			cardButtonStyle +
			' dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600';
	}

    const dispatch = createEventDispatcher();
	function handleCardButtonClick(cardCompID: string): void {
		dispatch('cardClick', {
			cardID: cardCompID
		});
	}
</script>

<div class={cardBackgroundStyle}>
    <slot></slot>

    {#if btnVisible}
        <button class={cardButtonStyle} on:click={() => handleCardButtonClick(cardID)}>
            {btnName}
            <svg
                class="size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
            >
        </button>
    {/if}
</div>