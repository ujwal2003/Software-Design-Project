<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	
	import { getRequest, postRequest } from '$lib/requests';
	import { getCookie } from '$lib/cookieUtil';
	
	import ScrollContainer from '$lib/components/scrollContainer.svelte';
	import PrelineTable from '$lib/components/preline-table/prelineTable.svelte';
	import TableSection from '$lib/components/preline-table/tableSection.svelte';
	import TableData from '$lib/components/preline-table/tableData.svelte';
	import TableRow from '$lib/components/preline-table/tableRow.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';

	let loadingVisible = false;
	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("You must be logged in to access this page. Please log in.");
			goto('/login');
		}

		await fetchQuoteHistory();
		getUserData();
	});

	interface QuoteCardDetail {
		_id: string,
		date: string;
		location: string;
		//deliveryDate: string;
		gallons: number;
		price: number;
		tax: number;
		total: number;
	}

	interface UserAddress {
		street: string;
		city: string;
		state: string;
		zip: string;
	}

	let userAddress : UserAddress = { street: '', city: '', state: '', zip: ''};

	let quotes: any[] = [];

	async function fetchQuoteHistory() {
		loadingVisible = true;
		try {
			const cookie = getCookie('user_session');

			if (!cookie) {
				throw new Error("User session cookie not found");
			}

			let quoteReq = JSON.parse(cookie);

			// const quoteAPIRes = await postRequest('api/quotes/retrieve', quoteReq);
			const quoteAPIRes = await getRequest(`api/quotes/retrieve/${quoteReq.username}`, {'access-token': quoteReq.accessToken});

			if (!quoteAPIRes.ok) {
				throw new Error("Failed to fetch quote history");
			}

			const quoteResJSON = await quoteAPIRes.json();

			if (!quoteResJSON.success || quoteResJSON.unauthorized) {
				throw new Error("Unauthorized access or unsuccessful response");
			}

			quotes = quoteResJSON.quoteHistory;
			loadingVisible = false;
			return;

		} catch (error) {
			console.error("Error fetching quote history:", error);
			loadingVisible = false;
			return [];
		}
	}

	async function getUserData() {
		loadingVisible = true;
		try {
			const cookie = getCookie('user_session');

			if (!cookie) {
				throw new Error("User session cookie not found");
			}

			let profileReq = JSON.parse(cookie);

			// const profileAPIRes = await postRequest('api/profile/info', profileReq);
			const profileAPIRes = await getRequest(`api/profile/info/${profileReq.username}`, {'access-token': profileReq.accessToken});

			if (!profileAPIRes.ok) {
				throw new Error("Failed to fetch profile data");
			}

			const profileResJSON = await profileAPIRes.json();

			if (!profileResJSON.success || profileResJSON.unauthorized) {
				throw new Error("Unauthorized access or unsuccessful response");
			}

			userAddress = {
				street: profileResJSON.profile.street,
				city: profileResJSON.profile.city,
				state: profileResJSON.profile.state,
				zip: profileResJSON.profile.zip
			};

		} catch (error) {
			console.error("Error fetching user data:", error);
		}
		loadingVisible = false;
	}

	function handleQuotePurchase(quoteID: string) {
		goto(`/payment/${quoteID}`);
	}

	async function createQuoteBttn(){
		const cookie = getCookie('user_session');
		if (!cookie) {
			throw new Error("User session cookie not found");
		}

		let profileReq = JSON.parse(cookie);

		const profileAPIRes = await getRequest(`api/profile/info/${profileReq.username}`, {'access-token': profileReq.accessToken});
		const profileResJSON = await profileAPIRes.json();

		if (!profileResJSON.success && profileResJSON.message == "Profile not found"){
			failureAlert("Please complete your profile first.");
		}
		else {
			goto('/quotes/new');
		}
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
			</nav>
		</aside>

		<!-- main content -->
		<section class="h-screen w-5/6 bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Fuel Quote History</p>

			<div class="pl-8 py-2 flex gap-4">
				<button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-xs font-semibold rounded-lg border border-transparent bg-gray-800 text-white 
				hover:border-gray-800 hover:text-gray-800 hover:bg-transparent" on:click={() => {createQuoteBttn()}}>
					Create Quote
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

				{#if loadingVisible}
					<LoadingSpinner>Loading quotes...</LoadingSpinner>
				{/if}
			</div>
			
			<div class="flex h-screen flex-row mt-2 ml-8">
				<ScrollContainer tailwindAppend='overflow-x-hidden' heightOffset={12}>
					<PrelineTable>
						<TableSection style='head' headBg='bg-gray-100'>
							<TableData header>Generation Date</TableData>
							<TableData header>Location</TableData>
							<TableData header>Gallons</TableData>
							<TableData header>Suggested Price</TableData>
							<TableData header>Total</TableData>
							<TableData header>Delivery Date</TableData>
							<!-- <TableData header>Purchase</TableData> -->
						</TableSection>
	
						<TableSection style='body'>
							{#each quotes as quote}
								<TableRow>
									<TableData>{quote.generationDate.slice(0, 10)}</TableData>
									<TableData>{userAddress.city}, {userAddress.state}</TableData>
									<TableData>{quote.gallonsRequested}</TableData>
									<TableData>${quote.priceCalculated} per gal</TableData>
									<TableData>${quote.priceCalculated*quote.gallonsRequested}</TableData>
									<TableData>{quote.deliveryDate.slice(0, 10)}</TableData>
									<!-- <TableData button on:tableBtnClick={() => handleQuotePurchase(quote._id)}>
										Purchase Quote
									</TableData> -->
								</TableRow>
							{/each}
						</TableSection>
					</PrelineTable>
				</ScrollContainer>
			</div>
		</section>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
