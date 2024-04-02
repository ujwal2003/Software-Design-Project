<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	
	import { postRequest } from '$lib/requests';
	import { getCookie } from '$lib/cookieUtil';
	
	import ScrollContainer from '$lib/components/scrollContainer.svelte';
	import PrelineTable from '$lib/components/preline-table/prelineTable.svelte';
	import TableSection from '$lib/components/preline-table/tableSection.svelte';
	import TableData from '$lib/components/preline-table/tableData.svelte';
	import TableRow from '$lib/components/preline-table/tableRow.svelte';

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

	let selectedQuoteDetails: QuoteCardDetail = {
		_id: '-',
		date: '-',
		location: '-',
		//deliveryDate: '-',
		gallons: 0,
		price: 0.0,
		tax: 0.0,
		total: 0.0
	};

	let quotes: any[] = [];

	async function fetchQuoteHistory() {
		try {
			const cookie = getCookie('user_session');

			if (!cookie) {
				throw new Error("User session cookie not found");
			}

			let quoteReq = JSON.parse(cookie);

			const quoteAPIRes = await postRequest('api/quotes/retrieve', quoteReq);

			if (!quoteAPIRes.ok) {
				throw new Error("Failed to fetch quote history");
			}

			const quoteResJSON = await quoteAPIRes.json();

			if (!quoteResJSON.success || quoteResJSON.unauthorized) {
				throw new Error("Unauthorized access or unsuccessful response");
			}

			quotes = quoteResJSON.quoteHistory;
			return;

		} catch (error) {
			console.error("Error fetching quote history:", error);
			return [];
		}
	}

	async function getUserData() {
		try {
			const cookie = getCookie('user_session');

			if (!cookie) {
				throw new Error("User session cookie not found");
			}

			let profileReq = JSON.parse(cookie);

			const profileAPIRes = await postRequest('api/profile/info', profileReq);

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
	}

	function handleQuotePurchase(quoteID: string) {
		goto(`/payment/${quoteID}`);
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

			<div class="flex h-screen flex-row mt-2 ml-8">
				<ScrollContainer tailwindAppend='overflow-x-hidden' noFlex>
					<PrelineTable>
						<TableSection style='head' headBg='bg-gray-100'>
							<TableData header>Generation Date</TableData>
							<TableData header>Location</TableData>
							<TableData header>Gallons</TableData>
							<TableData header>Suggested Price</TableData>
							<TableData header>Total</TableData>
							<TableData header>Purchase</TableData>
						</TableSection>
	
						<TableSection style='body'>
							{#each quotes as quote}
								<TableRow>
									<TableData>{quote.generationDate.slice(0, 10)}</TableData>
									<TableData>{userAddress.city}, {userAddress.state}</TableData>
									<TableData>{quote.gallonsRequested}</TableData>
									<TableData>${quote.priceCalculated} per gal</TableData>
									<TableData>${quote.priceCalculated*quote.gallonsRequested}</TableData>
									<TableData button>Purchase Quote</TableData>
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
