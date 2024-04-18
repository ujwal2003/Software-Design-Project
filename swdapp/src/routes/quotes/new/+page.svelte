<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert, genericAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	import { getCookie } from '$lib/cookieUtil';
	import { getRequest, postRequest } from '$lib/requests';
	import StatusText from '$lib/components/statusText.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { debounce } from '$lib/debounce';

	let locAddress: string = '';

	let newQuote = {
		gallonsRequested: 0,
		deliveryAddress: '',
		deliveryDate: '',
		suggestedPrice: 0.0,
		totalAmountDue: 0
	};

	let logged_in_user: string;
	let access_token: string;

	let addressValid: boolean;
	onMount(async () => {
		if(!await isClientAllowed('../')) {
			failureAlert("You must be logged in to access this page. Please log in.");
			goto('../login');
		}

		const cookie = getCookie('user_session');
		if(!cookie) {
			failureAlert('Error, please log in again...');
			goto('../login');
			return;
		}

		let profileReq = JSON.parse(cookie);
		logged_in_user = profileReq.username;
		access_token = profileReq.accessToken;
		// const profileAPIRes = await postRequest('../api/profile/info', profileReq);
		const profileAPIRes = await getRequest(`../api/profile/info/${profileReq.username}`, {'access-token': profileReq.accessToken});

		const profileResJSON = await profileAPIRes.json();

		if (!profileResJSON.success && profileResJSON.unauthorized) {
            failureAlert('Unauthorized, please log in again...');
			goto('../login');
			return;
        }

		if(!profileResJSON.success) {
			failureAlert('Error, please log in again...');
			goto('../login');
			return;
		}

		locAddress = `${profileResJSON.profile.city}, ${profileResJSON.profile.state}`;
		newQuote.deliveryAddress = locAddress;
		addressValid = newQuote.deliveryAddress.replaceAll(", ", '') == '' ? false : true;
	});

	let gallonsInputDisabled = false;
	let deliveryInputDisabled = false;
	let submitButtonDisabled = false;

	let loadQuote: boolean = false;
	let dateValid: boolean = newQuote.deliveryDate.length > 0 ? true : false;
	async function handleQuoteGeneration() {
		const today = new Date();
		let selectedDate = new Date(newQuote.deliveryDate);
		selectedDate.setDate(selectedDate.getDate()+1);
		
		if(newQuote.deliveryDate.length > 0)
			dateValid = (selectedDate < today) ? false : true;
		else dateValid = false;
		addressValid = newQuote.deliveryAddress.replaceAll(", ", '') == '' ? false : true;

		if(!dateValid || !addressValid || newQuote.gallonsRequested <= 0)
			return;

		// loadQuote = true;
		/**
		 * TODO:
		 * enable loading
		 * fetch new quote (disable inputs while fetching)
		 * disable load and enable inputs when new quote is generated
		 * alert user that quote was fetched
		*/

		loadQuote = true;
		gallonsInputDisabled = true;
		deliveryInputDisabled = true;
		submitButtonDisabled = true;

		const getQuote = await postRequest('../api/quotes/generate/', {
			username: logged_in_user,
			accessToken: access_token,
			gallonsRequested: newQuote.gallonsRequested,
			deliveryDate: newQuote.deliveryDate,
			loc: newQuote.deliveryAddress
		});

		console.log(getQuote);

		loadQuote = false;
		gallonsInputDisabled = false;
		deliveryInputDisabled = false;
		submitButtonDisabled = false;
	}

	async function handleQuoteGeneration_debounce() {
		debounce(handleQuoteGeneration, 800);
	}

	async function handleQuoteSubmit() {
		if(!dateValid || !addressValid || newQuote.gallonsRequested <= 0) {
			failureAlert("Error: form is not correctly filled out; No quote to save!");
			return;
		}

		genericAlert("Saving quote...");

		//TODO: fetch save quote endpoint
		//TODO: success or failure alert depending on status
	}
</script>

<div class="flex h-screen flex-col">
	<nav>
		<Header rootAPIRoutePrefix='../' />
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
			<div class="flex gap-3 pl-8 pt-4">
				<p class="text-3xl">Generate Quote</p>

				{#if loadQuote}				
					<LoadingSpinner>
						Generating quote...
					</LoadingSpinner>
				{/if}
			</div>
			
			<form class="px-8 pt-4">
			  <div class="mb-4">
				<label for="gallonsRequested" class="block text-sm font-semibold mb-1">Gallons Requested:</label>
				{#if newQuote.gallonsRequested <= 0}					
					<StatusText icon='error'>
						You must request more than 0 gallons!
					</StatusText>
				{/if}
				<div class="flex gap-1">
					<input type="number" id="gallonsRequested" bind:value={newQuote.gallonsRequested} on:input={handleQuoteGeneration_debounce}
					 disabled={gallonsInputDisabled}
					 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:opacity-85 disabled:text-gray-400">

					<button type="button" on:click={() => {newQuote.gallonsRequested += 10; handleQuoteGeneration_debounce()}} disabled={gallonsInputDisabled}
					 class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
						+10
					</button>

					<button type="button" on:click={() => {newQuote.gallonsRequested -= 10; handleQuoteGeneration_debounce()}} disabled={gallonsInputDisabled}
					 class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 text-gray-500 hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none">
						-10
					</button>
				</div>
				
			  </div>

			  <div class="mb-4">
				<label for="deliveryAddress" class="block text-sm font-semibold mb-1">Delivery Address:</label>
				{#if !addressValid}
					<StatusText icon='error'>
						{@html "Address not specified, please complete your <a href='/profile' style='text-decoration: underline;'>profile!</a>"}
					</StatusText>
				{/if}
				<input type="text" id="deliveryAddress" bind:value={newQuote.deliveryAddress} 
				 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:opacity-85 disabled:text-gray-400" disabled>
			  </div>

			  <div class="mb-4">
				<label for="deliveryDate" class="block text-sm font-semibold mb-1">Delivery Date:</label>
				{#if !dateValid}
					<StatusText icon='error'>
						You must select a date after today!
					</StatusText>
				{/if}
				<input type="date" id="deliveryDate" bind:value={newQuote.deliveryDate} on:change={handleQuoteGeneration}
				 disabled={deliveryInputDisabled}
				 class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 disabled:opacity-85 disabled:text-gray-400">
			  </div>
			</form>

			<div class="px-8 pt-2 bg-white">
				<div class="flex gap-2">
					<p class="font-semibold">Suggested Price Per Gallon:</p>
					<span class="block">
						{#if newQuote.suggestedPrice}
							${newQuote.suggestedPrice}
						{:else}
							generate a quote to see a price!
						{/if}
					</span>
				</div>

				<div class="flex gap-2">
					<p class="font-semibold">Total Amount Due:</p>
					<span class="block">
						{#if newQuote.totalAmountDue}
							${newQuote.totalAmountDue}
						{:else}
							$0.00
						{/if}
					</span>
				</div>

				<div class='mt-2'>
					<button type="button" on:click={handleQuoteSubmit} disabled={submitButtonDisabled}
						class="w-full py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none">
						Save Quote
					</button>
				</div>
			</div>
		</section>
	</main>

	<nav>
		<Footer />
	</nav>
</div>
