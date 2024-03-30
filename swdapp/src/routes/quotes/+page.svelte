<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	
	import CardContainer from '$lib/components/cards/cardContainer.svelte';
	import Card from '$lib/components/cards/card.svelte';
	import CardText from '$lib/components/cards/cardText.svelte';

	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';
	import DescListButton from '$lib/components/description-list/descListButton.svelte';

	import { dummyQuoteData } from '$lib';
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';

	import { postRequest } from '$lib/requests';
	import { getCookie } from '$lib/cookieUtil';

	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("You must be logged in to access this page. Please log in.");
			goto('/login');
		}
		await fetchQuoteHistory();
		getUserData();
	});

	interface QuoteCard {
		id: string;
		date: string;
		time: string;
		gallons: number;
		price: number;
	}

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

	//let quotes: QuoteCard[] = [];

	// replace this with filtering from database data later
	// let dummyQuotes: QuoteCard[] = dummyQuoteData.map((dat) => {
	// 	return {
	// 		id: dat._id,
	// 		date: dat.quoteDate,
	// 		time: dat.quoteTime,
	// 		gallons: dat.gallons,
	// 		price: dat.price
	// 	};
	// });

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

	// replace code in function with actual data from db later
	function getQuoteDetailsFromCard(e: any) {

		let quoteData = quotes.find((obj) => obj._id === e.detail.cardID);
		console.log(quoteData);
		if (quoteData != undefined) {
			selectedQuoteDetails._id = quoteData._id;
			selectedQuoteDetails.date = quoteData.generationDate.slice(0,10);
			selectedQuoteDetails.location = userAddress.city.concat(", ", userAddress.state);
			//selectedQuoteDetails.deliveryDate = quoteData.date; 
			selectedQuoteDetails.gallons = quoteData.gallonsRequested;
			selectedQuoteDetails.price = quoteData.priceCalculated;
			selectedQuoteDetails.tax = 3.14;
			selectedQuoteDetails.total = quoteData.priceCalculated * quoteData.gallonsRequested + 3.14;
		} else {
			selectedQuoteDetails = {
				_id: '-',
				date: '-',
				location: '-',
				//deliveryDate: '-',
				gallons: 0,
				price: 0.0,
				tax: 0.0,
				total: 0.0
			};
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

			<div class="flex h-screen flex-row">
				<div class="w-1/3 pl-7 pt-4">
					<CardContainer heightOffset={5}>
						{#each quotes as quote}
							<Card cardID={quote._id} btnName={"Quote Details"} on:cardClick={(e) => {getQuoteDetailsFromCard(e)}}>
								<CardText title={true}>
									{`${quote.generationDate.slice(0, 10)} at ${quote.generationDate.slice(11,16)}`}
								</CardText>
								<CardText>
									{`Requested Gallons: ${quote.gallonsRequested}`}
								</CardText>
								<CardText>
									{`Suggested Price: ${quote.priceCalculated} /gal`}
								</CardText>
							</Card>
						{/each}
					</CardContainer>
				</div>

				<div class="ml-6 mr-6 mt-4 flex h-1/2 w-2/3 flex-row">
					<DescriptionList>
						<DescListItem details={{ title: 'Quote Date', text: selectedQuoteDetails.date }} />
						<DescListItem details={{ title: 'Location', text: selectedQuoteDetails.location }} />
						<!-- <DescListItem
							details={{ title: 'Delivery Date', text: selectedQuoteDetails.deliveryDate }}
						/> -->
						<DescListItem details={{ title: 'Gallons', text: selectedQuoteDetails.gallons }} />
						<DescListItem
							details={{ title: 'Price', text: selectedQuoteDetails.price.toFixed(2) }}
						/>
						<DescListItem details={{ title: 'Tax', text: selectedQuoteDetails.tax.toFixed(2) }} />
						<DescListItem
							details={{ title: 'Total', text: selectedQuoteDetails.total.toFixed(2) }}
						/>
						<div class="flex w-full flex-row gap-3">
							<DescListButton
								btnColor={'bg-[#2563eb]'}
								btnColorHoever={'hover:bg-blue-700'}
								btnLabel={'Purchase Quote'}
								btnEvent={'quotePurchaseClick'}
								on:quotePurchaseClick={() => handleQuotePurchase(selectedQuoteDetails._id)}
							/>
							<DescListButton
								btnLabel={'Create New Quote'}
								btnEvent={'quoteCreateClick'}
								on:quoteCreateClick={() => goto('quotes/new/')}
							/>
						</div>
					</DescriptionList>
				</div>
			</div>
		</section>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
