<script lang="ts">
	console.warn("WARNING: QuoteCard has been deprecated in favor of the Card and CardList components");
	import { createEventDispatcher } from 'svelte';

	/**
	 * Colors and Dark Mode
	 */
	export let darkMode: boolean = false;

	let cardBackgroundStyle = `flex flex-col bg-white border shadow-sm rounded-xl p-4 md:p-5 mr-2`;
	let cardTitleStyle = `text-lg font-bold text-gray-800`;
	let cardDescriptionStyle = `mt-2 text-gray-500`;

	let quoteDetailsStyle = `
        mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none
    `;

	let scrollBarStyle = `
        flex flex-col gap-3
        cards-max-h overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
    `;

	if (darkMode) {
		cardBackgroundStyle =
			cardBackgroundStyle + ' dark:bg-slate-900 dark:border-gray-700 dark:shadow-slate-700/[.7]';
		cardTitleStyle = cardTitleStyle + ' dark:text-white';
		cardDescriptionStyle = cardDescriptionStyle + ' dark:text-gray-400';
		quoteDetailsStyle =
			quoteDetailsStyle +
			' dark:text-blue-500 dark:hover:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600';
		scrollBarStyle =
			scrollBarStyle +
			' dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500';
	}

	/**
	 * Quote Card Generation
	 */
	interface QuoteCard {
		id: string;
		date: string;
		time: string;
		gallons: number;
		price: number;
	}

	export let quoteCards: QuoteCard[];

	/**
	 * Card Details Button Handler
	 */
	const dispatch = createEventDispatcher();
	function handleCardDetailsClick(cardQuoteID: string): void {
		dispatch('cardDetailClick', {
			quoteID: cardQuoteID
		});
	}

	/**
	 * card text
	 */
	interface TextOverrideSetting {
		override: boolean;
		text: string;
		showProperty: 'price' | 'none';
	}
	export let textOverride: TextOverrideSetting = {
		override: false,
		text: '',
		showProperty: 'price'
	};
	export let btnName = 'Quote Details';
</script>

<!-- <div class="columns-1"> -->
<!-- scrollbar -->
<div class={scrollBarStyle} id="quoteCardContainer">
	{#each quoteCards as quote}
		<div class={cardBackgroundStyle}>
			<h3 class={cardTitleStyle}>
				{`${quote.date} at ${quote.time}`}
			</h3>

			{#if textOverride.override}
				<p class={cardDescriptionStyle}>
					{#if textOverride.showProperty == 'price'}
						{`${textOverride.text}${quote.price}`}
					{:else}
						{textOverride.text}
					{/if}
				</p>
			{:else}
				<p class={cardDescriptionStyle}>
					{`Requested Gallons: ${quote.gallons}`} <br />
					{`Suggested Price: $${quote.price.toFixed(2)} /gal`}
				</p>
			{/if}

			<button class={quoteDetailsStyle} on:click={() => handleCardDetailsClick(quote.id)}>
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
		</div>
	{/each}
</div>

<!-- </div> -->

<style>
	.cards-max-h {
		max-height: calc(95vh - 10%);
		/* max-height: calc(100vh - 18.7rem); */
	}
</style>
