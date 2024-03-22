<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";

	import CardContainer from "$lib/components/cards/cardContainer.svelte";
	import Card from "$lib/components/cards/card.svelte";
	import CardText from "$lib/components/cards/cardText.svelte";

	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';
	import DescListButton from '$lib/components/description-list/descListButton.svelte';
	
    import { dummyPaymentData } from "$lib";
	import { onMount } from "svelte";
	import { isClientAllowed } from "$lib/protected";
	import { failureAlert } from "$lib/components/toasts/customToasts";
	import { goto } from "$app/navigation";

	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("please log in to access this page");
			goto("/login");
		}
	});

	let dummyPayments = dummyPaymentData.map((dat) => {
		return {
			id: dat._id,
			date: dat.paymentDate,
			time: dat.paymentTime,
			gallons: 0,
			price: dat.payment
		};
	});

	// see `selectedQuoteDetails` in /quotes/+page for updating text descriptions
	function handleCardDetailClick(e: CustomEvent<any>) {
		console.log(`card with id ${e.detail.cardID} clicked!`);
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
				<a href="/" class="text-[#CBD5E1]"> Profile </a>
				<a href="/" class="text-[#CBD5E1]"> Quote History </a>
			</nav>
		</aside>

		<div class="flex w-5/6 flex-col flex-wrap bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Payment History</p>

			<div class="flex">
				<div class="w-1/3 pl-7 pt-4">
					<CardContainer>
						{#each dummyPayments as receipt}
							<Card cardID={receipt.id} btnName={"Payment Details"} on:cardClick={e => {handleCardDetailClick(e)}}>
								<CardText title>
									{`${receipt.date} at ${receipt.time}`}
								</CardText>
								<CardText>
									{`Payment: $${receipt.price}`}
								</CardText>
							</Card>
						{/each}
					</CardContainer>
				</div>

				<div class="ml-6 mr-6 mt-4 w-2/3">
					<DescriptionList>
						<DescListItem details={{ title: 'Payment Date', text: 'XX/XX/XXXX' }} />
						<DescListItem details={{ title: 'Delivery Date', text: 'XX/XX/XXXX' }} />
						<DescListItem details={{ title: 'Payment', text: '$XXX.XX' }} />
						<DescListItem details={{ title: 'Tax', text: '$XXX.XX' }} />
						<DescListItem details={{ title: 'Total', text: '$XXX.XX' }} />
						<DescListItem details={{ title: 'Description', text: 'You purchased [X] gallons of fuel for $X.XX' }} />
						<div>
							<!-- <DescListButton btnLabel={"See Quote Details"} btnEvent={"quoteDetailClicked"} on:quoteDetailClicked={handleQuoteDetailClick} /> -->
						</div>
					</DescriptionList>
				</div>
			</div>
		</div>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
