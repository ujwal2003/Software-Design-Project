<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";
	import QuoteCards from "$lib/components/quoteCards.svelte";
	import QuoteDetail from "$lib/components/quoteDetail.svelte";

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

<<<<<<< HEAD
    // dummy data get actual data and format it from database
    interface DummyData {_id: string, quoteDate: string, quoteTime: string, loc: string, deliveryDate: string, gallons: number, price: number, tax: number};
    let dummyQuoteData: DummyData[] = [
        {_id: "da95101afa3ecfda46d1", quoteDate: "2/21/2024", quoteTime: "1:59pm", loc: "houston", deliveryDate: "2/24/2024", gallons: 5, price: 2.86, tax: 3.14},
        {_id: "09075d1659108ae43ea4", quoteDate: "2/20/2024", quoteTime: "11:35am", loc: "houston", deliveryDate: "2/23/2024", gallons: 3, price: 3.86, tax: 1.59},
        {_id: "1042af652e115fc669f3", quoteDate: "2/18/2024", quoteTime: "4:30pm", loc: "houston", deliveryDate: "2/21/2024", gallons: 10, price: 5.86, tax: 2.65},
        {_id: "c69380778bd5ed7be644", quoteDate: "2/17/2024", quoteTime: "9:30am", loc: "houston", deliveryDate: "2/18/2024", gallons: 9, price: 4.86, tax: 3.58}
    ];
=======
	// dummy data get actual data and format it from database
	interface DummyData {
		_id: string;
		quoteDate: string;
		quoteTime: string;
		loc: string;
		deliveryDate: string;
		gallons: number;
		price: number;
		tax: number;
	}
	let dummyQuoteData: DummyData[] = [
		{
			_id: "da95101afa3ecfda46d1",
			quoteDate: "2/21/2024",
			quoteTime: "1:59pm",
			loc: "houston",
			deliveryDate: "2/24/2024",
			gallons: 5,
			price: 2.86,
			tax: 3.14
		},
		{
			_id: "09075d1659108ae43ea4",
			quoteDate: "2/20/2024",
			quoteTime: "11:35am",
			loc: "houston",
			deliveryDate: "2/23/2024",
			gallons: 3,
			price: 3.86,
			tax: 1.59
		},
		{
			_id: "1042af652e115fc669f3",
			quoteDate: "2/18/2024",
			quoteTime: "4:30pm",
			loc: "houston",
			deliveryDate: "2/21/2024",
			gallons: 10,
			price: 5.86,
			tax: 2.65
		},
		{
			_id: "c69380778bd5ed7be644",
			quoteDate: "2/17/2024",
			quoteTime: "9:30am",
			loc: "houston",
			deliveryDate: "2/18/2024",
			gallons: 9,
			price: 4.86,
			tax: 3.58
		}
	];
>>>>>>> origin/dev

	let dummyQuotes: QuoteCard[] = dummyQuoteData.map((dat) => {
		return {
			id: dat._id,
			date: dat.quoteDate,
			time: dat.quoteTime,
			gallons: dat.gallons,
			price: dat.price
		};
	});

	// replace code in function with actual data from db
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

<<<<<<< HEAD
    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap h-full">
        <!-- left sidebar -->
        <aside class="w-1/6 bg-[#282828] h-full flex justify-left pl-10 pt-6 text-lg">
            <nav class="flex flex-col gap-2">
                <a href="/" class="text-[#CBD5E1]"> 
                    Profile 
                </a>
    
                <a href="/" class="text-[#CBD5E1]"> 
                    Payment History 
                </a>
            </nav>
        </aside>
=======
	<main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-0 h-full">
		<!-- left sidebar -->
		<aside class="w-1/6 bg-[#282828] h-full flex justify-left pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/" class="text-[#CBD5E1]"> Profile </a>
>>>>>>> origin/dev

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
