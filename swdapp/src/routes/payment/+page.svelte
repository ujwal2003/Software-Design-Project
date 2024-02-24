<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import QuoteCards from '$lib/components/quoteCards.svelte';


  let gallonsRequested = 0;
  let deliveryAddress = '';
  let deliveryDate = '';

  function generateQuote() {
    // You can implement your logic for generating the quote here
    const suggestedPricePerGallon = 2.50; // Example value
    const totalAmountDue = gallonsRequested * suggestedPricePerGallon;
    
    // Display the suggested price per gallon and total amount due
    alert(`Suggested Price Per Gallon: $${suggestedPricePerGallon.toFixed(2)}\nTotal Amount Due: $${totalAmountDue.toFixed(2)}`);
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

				<a href="/payment" class="text-[#CBD5E1]"> Payment History </a>
			</nav>
		</aside>

		<section class="h-screen w-5/6 bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Generate Quote</p>
			<form class="p-8">
			  <div class="mb-4">
				<label for="gallonsRequested" class="block text-sm font-semibold mb-2">Gallons Requested:</label>
				<input type="number" id="gallonsRequested" bind:value={gallonsRequested} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
			  </div>
			  <div class="mb-4">
				<label for="deliveryAddress" class="block text-sm font-semibold mb-2">Delivery Address:</label>
				<input type="text" id="deliveryAddress" bind:value={deliveryAddress} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
			  </div>
			  <div class="mb-4">
				<label for="deliveryDate" class="block text-sm font-semibold mb-2">Delivery Date:</label>
				<input type="date" id="deliveryDate" bind:value={deliveryDate} class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200">
			  </div>
			  <button type="button" on:click={generateQuote} class="w-full py-3 px-4 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
				Generate Quote
			  </button>
			</form>
			<div class="p-8 bg-white mt-8">
			  <p class="font-semibold">Suggested Price Per Gallon:</p>
			  <!-- This span will display the suggested price per gallon -->
			  <span class="block">$2.50</span>
			  <p class="font-semibold mt-4">Total Amount Due:</p>
			  <!-- This span will display the total amount due -->
			  <span class="block">$0.00</span>
			</div>
		  </section>



	</main>

	<!-- footer -->
	<nav>
		<Footer />
	</nav>

</div>
