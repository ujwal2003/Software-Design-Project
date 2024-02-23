<!-- This will be deprecated soon -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	interface QuoteCardDetail {
		date: string;
		location: string;
		deliveryDate: string;
		gallons: number;
		price: number;
		tax: number;
		total: number;
	}


	export let details: QuoteCardDetail;

</script>

<div class="rounded-xl bg-[#E9F0F6] p-4 shadow-md md:p-5">
	<dl class="mb-3 grid gap-1 sm:grid-cols-3 sm:gap-3">
		<dt class="font-semibold sm:col-span-1">Quote Date</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">{details.date}</dd>

		<dt class="font-semibold sm:col-span-1">Location</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">
			{details.location}
		</dd>

		<dt class="font-semibold sm:col-span-1">Delivery Date</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">{details.deliveryDate}</dd>

		<dt class="truncate font-semibold sm:col-span-1">Gallons</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">{details.gallons} gal</dd>

		<dt class="font-semibold sm:col-span-1">Price</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">${details.price.toFixed(2)} per gal</dd>

		<dt class="font-semibold sm:col-span-1">Tax</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">${details.tax}</dd>

		<dt class="font-semibold sm:col-span-1">Total</dt>
		<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">${details.total}</dd>
	</dl>
	<button
		type="button"
		class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
		on:click={() => {
			dispatch('quotePurchaseClick');
		}}
	>
		Purchase Quote
	</button>
</div>
