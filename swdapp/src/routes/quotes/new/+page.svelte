<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';

	onMount(async () => {
		if(!await isClientAllowed('../')) {
			failureAlert("You must be logged in to access this page. Please log in.");
			goto('../login');
		}
	});

	let newQuote = {
		gallonsRequested: 0,
		deliveryAddress: 'test',
		deliveryDate: '',
		suggestedPrice: 0.0,
		totalAmountDue: 0
	};

	function handleQuoteSubmit() {
		console.log('Payment Submitted');
		console.log('Gallons Requested:', newQuote.gallonsRequested);
		console.log('Delivery Address:', newQuote.deliveryAddress);
		console.log('Delivery Date:', newQuote.deliveryDate);
		console.log('Suggested Price:', newQuote.suggestedPrice);
		console.log('Total Amount Due:', newQuote.totalAmountDue);
	}
</script>

<div class="flex h-screen flex-col">
	<nav>
		<Header />
	</nav>

	<main class="mt-0 flex max-w-full flex-wrap">
		<!-- left sidebar -->
		<aside class="justify-left flex h-full w-1/6 bg-[#282828] pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/profile" class="text-[#CBD5E1]"> Profile </a>
				<a href="/receipts" class="text-[#CBD5E1]"> Payment History </a>
				<a href="/quotes" class="text-[#CBD5E1]"> Fuel Quote History </a>
			</nav>
		</aside>

		<section class="h-screen w-5/6 bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Generate Quote</p>
			<form class="p-8">
			  <div class="mb-4">
				<label for="gallonsRequested" class="block text-sm font-semibold mb-2">Gallons Requested:</label>
				<input type="number" id="gallonsRequested" bind:value={newQuote.gallonsRequested} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
			  </div>

			  <div class="mb-4">
				<label for="deliveryAddress" class="block text-sm font-semibold mb-2">Delivery Address:</label>
				<input type="text" id="deliveryAddress" bind:value={newQuote.deliveryAddress} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
			  </div>

			  <div class="mb-4">
				<label for="deliveryDate" class="block text-sm font-semibold mb-2">Delivery Date:</label>
				<input type="date" id="deliveryDate" bind:value={newQuote.deliveryDate} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
			  </div>

			  <button type="button" on:click={handleQuoteSubmit} class="w-full py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
				Generate Quote
			  </button>
			</form>
			<div class="p-8 bg-white mt-8">
			  <p class="font-semibold">Suggested Price Per Gallon:</p>
			  <span class="block">$2.50</span>

			  <p class="font-semibold mt-4">Total Amount Due:</p>
			  <span class="block">$0.00</span>
			</div>
		  </section>
	</main>

	<nav>
		<Footer />
	</nav>
</div>
