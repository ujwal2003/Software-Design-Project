<script lang="ts">
	import { createEventDispatcher } from "svelte";

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

<div class="bg-[#E9F0F6] shadow-md rounded-xl p-4 md:p-5">
	<dl class="grid sm:grid-cols-3 gap-1 sm:gap-3 mb-3">
		<dt class="sm:col-span-1 font-semibold">Quote Date</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">{details.date}</dd>

		<dt class="sm:col-span-1 font-semibold">Location</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">
			{details.location}
		</dd>

		<dt class="sm:col-span-1 font-semibold">Delivery Date</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">{details.deliveryDate}</dd>

		<dt class="sm:col-span-1 font-semibold truncate">Gallons</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">{details.gallons} gal</dd>

		<dt class="sm:col-span-1 font-semibold">Price</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">${details.price.toFixed(2)} per gal</dd>

		<dt class="sm:col-span-1 font-semibold">Tax</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">${details.tax}</dd>

		<dt class="sm:col-span-1 font-semibold">Total</dt>
		<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]">${details.total}</dd>
	</dl>
	<button
		type="button"
		class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
		on:click={() => {
			dispatch("quotePurchaseClick");
		}}
	>
		Purchase Quote
	</button>
</div>
