<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";
	import QuoteCards from "$lib/components/quoteCards.svelte";
	import QuoteDetail from "$lib/components/quoteDetail.svelte";

	import { dummyQuoteData } from "$lib";

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
		date: "-",
		location: "-",
		deliveryDate: "-",
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
				date: "-",
				location: "-",
				deliveryDate: "-",
				gallons: 0,
				price: 0.0,
				tax: 0.0,
				total: 0.0
			};
		}
	}

	function handleQuotePurchase() {
		console.log("Purchase Button Clicked!");
	}
</script>

<div class="flex flex-col h-screen">
	<nav>
		<Header />
	</nav>

	<main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-0 h-full">
		<!-- left sidebar -->
		<aside class="w-1/6 bg-[#282828] h-full flex justify-left pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/" class="text-[#CBD5E1]"> Profile </a>
				<a href="/" class="text-[#CBD5E1]"> Payment History </a>
			</nav>
		</aside>

		<!-- main content -->
		<div class="w-5/6 bg-[#F0F5F8] flex flex-col flex-wrap">
			<p class="text-3xl pl-8 pt-4">Fuel Quote History</p>

			<div class="flex">
				<div class="w-1/3 pl-7 pt-4">
					<QuoteCards
						quoteCards={dummyQuotes}
						on:cardDetailClick={(e) => getQuoteDetailsFromCard(e)}
					/>
				</div>

				<div class="w-2/3 ml-6 mr-6 mt-4">
					<QuoteDetail details={selectedQuoteDetails} on:quotePurchaseClick={handleQuotePurchase} />
				</div>
			</div>
		</div>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
