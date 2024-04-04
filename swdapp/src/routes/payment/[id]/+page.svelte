<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';
	import { page } from '$app/stores';
	import { getCookie } from '$lib/cookieUtil';
	import { getRequest, postRequest } from '$lib/requests';

	const currentPage = $page;
	const id = currentPage.params.id;
	let quote: any = null;
	let profile: any = null;
	let paymentInfo: any = null;


	onMount(async () => {
		if(!await isClientAllowed("../")) {
			failureAlert("Please log in to access this page.");
			goto('/login');
		}

		quote = await getQuote(id);
		profile = await getProfile();
		paymentInfo = await getPaymentInfo();
	});


	async function getProfile(){

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let profileReq = JSON.parse(cookie);

		const username = profileReq.username;
    	let accessToken = profileReq.accessToken;

		const profileAPIRes = await postRequest('../api/profile/info', {username: username, accessToken: accessToken});
		const profileResJSON = await profileAPIRes.json();

		if(!profileResJSON.success) {
			const failMsg = profileResJSON.message;
			if (failMsg == "Profile not found"){
				failureAlert("No profile found.")
				return [];
			}
			else if (failMsg == "Request failed due to error"){
				failureAlert("Could not retrieve profile due to unexpected error.")
				return [];
			}
		}

		return profileResJSON.profile;
	}

	async function getPaymentInfo(){

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let profileReq = JSON.parse(cookie);

		const username = profileReq.username;
    	let accessToken = profileReq.accessToken;

		const profileAPIRes = await postRequest('../api/profile/info', {username: username, accessToken: accessToken});
		const profileResJSON = await profileAPIRes.json();

		if(!profileResJSON.success) {
			const failMsg = profileResJSON.message;
			if (failMsg == "Profile not found"){
				failureAlert("No profile found.")
				return [];
			}
			else if (failMsg == "Request failed due to error"){
				failureAlert("Could not retrieve profile due to unexpected error.")
				return [];
			}
		}

		return profileResJSON.paymentInfo;
	}

	async function getQuote(_id: string){

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let quoteHistReq = JSON.parse(cookie);

		const username = quoteHistReq.username;
    	let accessToken = quoteHistReq.accessToken;

		// const quoteHistAPIRes = await postRequest('../api/quotes/retrieve', {username: username, accessToken: accessToken});
		const quoteHistAPIRes = await getRequest(`../api/quotes/retrieve/${username}`, {'access-token': accessToken});
		const quiteHistResJSON = await quoteHistAPIRes.json();

		if(!quiteHistResJSON.success) {
			const failMsg = quiteHistResJSON.message;
			if (failMsg == "Quote history not found"){
				failureAlert("No quote history found.")
				return [];
			}
			else if (failMsg == "Request failed due to error"){
				failureAlert("Could not retrieve quote history due to unexpected error.")
				return [];
			}
		}

		const foundQuote = quiteHistResJSON.quoteHistory.find((quote: any) => quote._id === _id);
		return foundQuote;
	}

	function calcPrice(gallons: number, price: number){
		let subtotal = gallons * price;
		let tax = 0.0625 * subtotal;
		return subtotal + tax;
	}

	async function purchaseQuote() {

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let makePaymentReq = JSON.parse(cookie);

		const username = makePaymentReq.username;
    	let accessToken = makePaymentReq.accessToken;

		const makePaymentAPIRes = await postRequest('../api/payment/pay', {username: username, accessToken: accessToken, company: "Exxon", price: calcPrice(quote.gallonsRequested, quote.priceCalculated)});
		const makePaymentResJSON = await makePaymentAPIRes.json();
		
		if(!makePaymentResJSON.success) {
			const failMsg = makePaymentResJSON.message;
			if (failMsg == "Payment failed"){
				failureAlert("Payment failed!")
				return [];
			}
			else if (failMsg == "Request failed due to error"){
				failureAlert("Could not complete payment due to unexpected error.")
				return [];
			}
		}

		successAlert("Payment successful!")
		goto('/receipts');
	}

	function formatPrice(price: number): string {
		if (price % 1 !== 0) {
			return price.toFixed(2);
		} else {
			return price.toFixed(1);
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString);

		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const year = String(date.getFullYear());

		const formattedDate = `${month}/${day}/${year}`;

		return formattedDate;
	}
</script>



<!-- entire page -->
<div class="flex h-screen flex-col">
	<!-- header -->
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
			<p class="pl-8 pt-4 text-3xl">Purchase Quote</p>

			<div class="p-8">
				{#if quote && profile}
					<DescriptionList>
						<DescListItem details={{title: "Quote Generation Date", text: formatDate(quote.generationDate)}} />
						<DescListItem details={{title: "Delivery Location", text: (profile.street + ", " + profile.city + ", " + profile.state + " " + profile.zip)}} />
						<DescListItem details={{title: "Gallons", text: quote.gallonsRequested}} />
						<DescListItem details={{title: "Price per gal", text: formatPrice(quote.priceCalculated)}} />
						<DescListItem details={{title: "Tax", text: formatPrice(quote.priceCalculated * 0.0625)}} />
						<DescListItem details={{title: "Total", text: formatPrice(calcPrice(quote.gallonsRequested, quote.priceCalculated))}} />
					</DescriptionList>
				{:else}
					<p>Loading...</p>
				{/if}

			</div>

			<div class="px-8">
				<button type="button" on:click={purchaseQuote} class="w-full py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
				  Confirm Purchase
				</button>
			</div>

			<div class="p-8 bg-white mt-8">
			  <p class="font-semibold">Payment Method:</p>
			  {#if paymentInfo}
				<span class="block">
					{paymentInfo.cardName}<br>
					Card Number Ending in ...{paymentInfo.cardNumber.slice(-4)}
				</span>
			  {:else}
			  	<p>Loading...</p>
			  {/if}

			  <!-- <p class="font-semibold mt-4">Total Amount Due:</p> -->
			  <!-- <span class="block">$0.00</span> -->
			</div>
		  </section>



	</main>

	<!-- footer -->
	<nav>
		<Footer />
	</nav>

</div>
