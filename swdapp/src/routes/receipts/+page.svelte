<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";

	import ScrollContainer from "$lib/components/scrollContainer.svelte";
	import Card from "$lib/components/cards/card.svelte";
	import CardText from "$lib/components/cards/cardText.svelte";

	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';
	import DescListButton from '$lib/components/description-list/descListButton.svelte';
	
	import { onMount } from "svelte";
	import { isClientAllowed } from "$lib/protected";
	import { failureAlert, successAlert } from "$lib/components/toasts/customToasts";
	import { goto } from "$app/navigation";
	import { getRequest, postRequest } from '$lib/requests';
	import { getCookie } from '$lib/cookieUtil';

	let receipts: any[] = [];
	let selectedReceipt: any = null;
	let selectedQuote: any = null;
 	let showDescriptionList = false;

	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("please log in to access this page");
			goto("/login");
		}

		receipts = await getReceipts();
	});

	async function handleCardDetailClick(e: CustomEvent<any>) {
		const cardID = e.detail.cardID;
		selectedReceipt = receipts.find(receipt => receipt._id === cardID);
		selectedQuote = await getQuote(selectedReceipt.quoteID);
		showDescriptionList = true;
	}

	async function getReceipts(){

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let receiptReq = JSON.parse(cookie);

		const username = receiptReq.username;
    	let accessToken = receiptReq.accessToken;

		console.log(username);
		console.log(accessToken);

		// const receiptAPIRes = await postRequest('api/payment/receipts', {username: username, accessToken: accessToken});
		const receiptAPIRes = await getRequest(`api/payment/receipts/${username}`, {'access-token': accessToken});
		const receiptResJSON = await receiptAPIRes.json();

		if(!receiptResJSON.success) {
			const failMsg = receiptResJSON.message;
			if (failMsg == "Purchase history not found"){
				failureAlert("No purchase history found.")
				return [];
			}
			else if (failMsg == "Request failed due to error"){
				failureAlert("Could not retrieve purchase history due to unexpected error.")
				return [];
			}
		}

		return receiptResJSON.purchaseHistory;
	}

	async function getQuote(_id: string){

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let quoteHistReq = JSON.parse(cookie);

		const username = quoteHistReq.username;
    	let accessToken = quoteHistReq.accessToken;

		// const quoteHistAPIRes = await postRequest('api/quotes/retrieve', {username: username, accessToken: accessToken});
		const quoteHistAPIRes = await getRequest(`api/quotes/retrieve/${username}`, {'access-token': accessToken});
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

	function formatDate(dateString: string): string {
		const date = new Date(dateString);

		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const year = String(date.getFullYear());

		const formattedDate = `${month}/${day}/${year}`;

		return formattedDate;
	}

	function formatPrice(price: number): string {
		if (price % 1 !== 0) {
			return price.toFixed(2);
		} else {
			return price.toFixed(1);
		}
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
				<a href="/quotes" class="text-[#CBD5E1]"> Quote History </a>
			</nav>
		</aside>

		<div class="flex w-5/6 flex-col flex-wrap bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Payment History</p>

			<div class="flex">
				<div class="{showDescriptionList ? 'w-1/3 pl-7' : 'w-1/3 pl-5'} pt-4">
					
					<ScrollContainer>
						{#each receipts as receipt}
						  <Card cardID={receipt._id} btnName={"Payment Details"} on:cardClick={e => {handleCardDetailClick(e)}}>
							<CardText title>
							  {`${formatDate(receipt.purchaseDate)} at ${formatDate(receipt.deliveryDate)}`}
							</CardText>
							<CardText>
							  {`Payment: $${receipt.price}`}
							</CardText>
						  </Card>
						{/each}
					  </ScrollContainer>
					
				</div>


				{#if showDescriptionList && selectedReceipt}
					<div class="ml-6 mr-6 mt-4 w-2/3">
						<DescriptionList>
						<DescListItem details={{ title: 'Purchase Date', text: formatDate(selectedReceipt.purchaseDate) }} />
						<DescListItem details={{ title: 'Delivery Date', text: formatDate(selectedReceipt.deliveryDate) }} />
						<DescListItem details={{ title: 'Payment', text: `$${formatPrice(selectedReceipt.price)}` }} />
						<DescListItem details={{ title: 'Tax', text: `$${formatPrice(selectedReceipt.tax)}` }} />
						<DescListItem details={{ title: 'Total', text: `$${formatPrice(selectedReceipt.price + selectedReceipt.tax)}` }} />
						<DescListItem details={{ title: 'Description', text: 'You purchased ' + selectedQuote.gallonsRequested + ' gallons of fuel for ' + `$${formatPrice(selectedReceipt.price + selectedReceipt.tax)}` }} />
						
						<div>
							<!-- <DescListButton btnLabel={"See Quote Details"} btnEvent={"quoteDetailClicked"} on:quoteDetailClicked={handleQuoteDetailClick} /> -->
						</div>

						</DescriptionList>
					</div>
					{/if}


			</div>
		</div>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
