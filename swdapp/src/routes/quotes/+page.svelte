<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import QuoteCards from '$lib/components/quoteCards.svelte';

	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';
	import DescListButton from '$lib/components/description-list/descListButton.svelte';

	import { dummyQuoteData } from '$lib';

	interface QuoteCard {
		id: string;
		date: string;
		time: string;
		gallons: number;
		price: number;
	}

	interface QuoteCardDetail {
		date: string;
		location: string;
		deliveryDate: string;
		gallons: number;
		price: number;
		tax: number;
		total: number;
	}

	let selectedQuoteDetails: QuoteCardDetail = {
		date: '-',
		location: '-',
		deliveryDate: '-',
		gallons: 0,
		price: 0.0,
		tax: 0.0,
		total: 0.0
	};

	// replace this with filtering from database data later
	let dummyQuotes: QuoteCard[] = dummyQuoteData.map((dat) => {
		return {
			id: dat._id,
			date: dat.quoteDate,
			time: dat.quoteTime,
			gallons: dat.gallons,
			price: dat.price
		};
	});

	// replace code in function with actual data from db later
	function getQuoteDetailsFromCard(e: any) {
		console.log(e.detail);
		let dummyData = dummyQuoteData.find((obj) => obj._id === e.detail.quoteID);
		if (dummyData != undefined) {
			selectedQuoteDetails.date = dummyData.quoteDate;
			selectedQuoteDetails.location = dummyData.loc;
			selectedQuoteDetails.deliveryDate = dummyData.deliveryDate;
			selectedQuoteDetails.gallons = dummyData.gallons;
			selectedQuoteDetails.price = dummyData.price;
			selectedQuoteDetails.tax = dummyData.tax;
			selectedQuoteDetails.total = dummyData.price * dummyData.gallons + dummyData.tax;
		} else {
			selectedQuoteDetails = {
				date: '-',
				location: '-',
				deliveryDate: '-',
				gallons: 0,
				price: 0.0,
				tax: 0.0,
				total: 0.0
			};
		}
	}

	function handleQuotePurchase() {
		console.log('Purchase Button Clicked!');
	}

	function handleCreateQuote(e: any) {
		console.log('Create Quote Button Clicked!');
		console.log(e.detail);
	}
</script>

<div class="flex h-screen flex-col">
	<nav>
		<Header />
	</nav>

	<main class="mt-0 flex h-full max-w-full flex-wrap overflow-hidden overflow-x-hidden">
		<!-- left sidebar -->
		<aside class="justify-left flex h-full w-1/6 bg-[#282828] pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/profile" class="text-[#CBD5E1]"> Profile </a>

				<a href="/payment" class="text-[#CBD5E1]"> Payment History </a>
			</nav>
		</aside>

		<!-- main content -->
		<div class="flex w-5/6 flex-col flex-wrap bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Fuel Quote History</p>

			<div class="flex">
				<div class="w-1/3 pl-7 pt-4">
					<QuoteCards
						quoteCards={dummyQuotes}
						on:cardDetailClick={(e) => getQuoteDetailsFromCard(e)}
					/>
				</div>

				<div class="ml-6 mr-6 mt-4 w-2/3">
					<DescriptionList>
						<DescListItem details={{ title: 'Quote Date', text: selectedQuoteDetails.date }} />
						<DescListItem details={{ title: 'Location', text: selectedQuoteDetails.location }} />
						<DescListItem
							details={{ title: 'Delivery Date', text: selectedQuoteDetails.deliveryDate }}
						/>
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
								on:quotePurchaseClick={handleQuotePurchase}
							/>
							<DescListButton
								btnLabel={'Create New Quote'}
								btnEvent={'quotePurchaseClick'}
								on:click={handleCreateQuote}
							/>
						</div>
					</DescriptionList>
				</div>
				<div class=""></div>
			</div>
		</div>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
