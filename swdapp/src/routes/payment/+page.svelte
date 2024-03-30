<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';

	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("Please log in to access this page.");
			goto('/login');
		}
	});

	function purchaseQuote() {
		console.log("clicked purchase!")
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
				<DescriptionList>
					<DescListItem details={{title: "Quote Generation Date", text: "XX/XX/XXXX"}} />
					<DescListItem details={{title: "Delivery Location", text: "location"}} />
					<DescListItem details={{title: "Gallons", text: "XX gal"}} />
					<DescListItem details={{title: "Price per gal", text: "$XX.XX"}} />
					<DescListItem details={{title: "Tax", text: "$XX.XX"}} />
					<DescListItem details={{title: "Total", text: "$XX.XX"}} />
				</DescriptionList>
			</div>

			<div class="px-8">
				<button type="button" on:click={purchaseQuote} class="w-full py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
				  Confirm Purchase
				</button>
			</div>

			<div class="p-8 bg-white mt-8">
			  <p class="font-semibold">Payment Method:</p>
			  <span class="block">specified in <a href='/profile'><u>profile</u></a></span>

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
