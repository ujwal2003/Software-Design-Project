<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { dummyUserData } from '$lib';
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
		deliveryAddress: dummyUserData.address.address1,
		deliveryDate: '',
		suggestedPrice: 0.0,
		totalAmountDue: 0
	};

	function handleQuoteSubmit() {
		console.log('Payment Submitted');
		console.log('Gallons Requested:', newQuote.gallonsRequested);
		console.log('Delivery Address:', dummyUserData.address.address1);
		console.log('Delivery Date:', newQuote.deliveryDate);
		console.log('Suggested Price:', newQuote.suggestedPrice);
		console.log('Total Amount Due:', newQuote.totalAmountDue);
	}

	let textBoxStyle =
		'py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:frin-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-100';
</script>

<div class="flex h-screen flex-col">
	<nav>
		<Header rootAPIRoutePrefix={'../'} />
	</nav>

	<main class="mt-0 flex max-w-full flex-wrap">
		<!-- left sidebar -->
		<aside class="justify-left flex h-full w-1/6 bg-[#282828] pl-8 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/profile" class="text-[#CBD5E1]"> Profile </a>

				<a href="/receipts" class="text-[#CBD5E1]"> Payment History </a>

				<a href="/quotes" class="text-[#CBD5E1]"> Fuel Quote History </a>
			</nav>
		</aside>

		<!-- main content -->
		<section class="h-screen w-5/6 bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Create New Quote</p>
			<!-- Form Field -->
			<section class="mx-auto flex h-full w-full grow flex-row flex-wrap gap-5 pl-5 pt-5">
				<!-- Name Card -->
				<div class="shrink-1 flex h-[28rem] w-[30rem] flex-col rounded-xl bg-white px-8 py-5">
					<div class="flex flex-col text-lg font-bold text-black">Enter Quote Details</div>
					<form on:submit={handleQuoteSubmit}>
						<div class="flex flex-col">
							<label class="mt-4 text-gray-800" for="first-name">Gallons Requested</label>
							<input
								class={textBoxStyle}
								type="number"
								id="first-name"
								bind:value={newQuote.gallonsRequested}
							/>
						</div>
						<!-- TODO: Change to be a date picker -->
						<div class="flex flex-col">
							<label class="mt-4 text-gray-800" for="middle-name">Delivery Date</label>
							<input
								class={textBoxStyle}
								type="text"
								id="middle-name"
								bind:value={newQuote.deliveryDate}
							/>
						</div>
						<div class="mt-5 flex flex-col gap-2">
							<p class=" text-gray-800">
								Delivery Address: <span class="text-gray-400">{dummyUserData.address.address1}</span
								>
							</p>
							<!-- TODO: Update with pricing module -->
							<p class=" text-gray-800">Suggested Price Per Gal: {newQuote.suggestedPrice}</p>
							<!-- TODO -->
							<p class=" text-gray-800">
								Total Amount Due: <span class="text-blue-600">{newQuote.totalAmountDue}</span>
							</p>
						</div>

						<div class="flex flex-row justify-end pt-20">
							<button
								type="submit"
								class="inline-flex gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
								on:click={handleQuoteSubmit}>Submit</button
							>
						</div>
					</form>
				</div>
			</section>
		</section>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
