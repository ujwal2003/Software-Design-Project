<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";

	// Input variables
	let name = {
		firstName: "",
		middleName: "",
		lastName: ""
	};

	let payment = {
		cardName: "",
		cardNumber: "",
		expirationDate: "",
		ccv: ""
	};

	let address = {
		address1: "",
		city: "",
		state: "",
		zip: ""
	};

	// Input TextBox Styling
	let textBoxStyle =
		"py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:frin-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-100";

	// Input Form Handling
	function handleAddressSubmit(e: any) {
		console.log("Address Submitted");
		console.log("Address 1:", address.address1);
		console.log("City:", address.city);
		console.log("State:", address.state);
		console.log("Zipcode:", address.zip);
	}

	function handleNameSubmit(e: any) {
		console.log("Name Submitted");
		console.log("First Name:", name.firstName);
		console.log("Middle Name:", name.middleName);
		console.log("Last Name:", name.lastName);
	}

	function handlePaymentSubmit(e: any) {
		console.log("Payment Submitted");
		console.log("Card Name:", payment.cardName);
		console.log("Card Number:", payment.cardNumber);
		console.log("Expiration Date:", payment.expirationDate);
		console.log("CVV:", payment.ccv);
	}
</script>

<section class="flex flex-col">
	<nav>
		<Header />
	</nav>

	<main class="overflow-auto max-w-full flex flex-wrap">
		<!-- * Sidebar -->
		<aside class="w-1/6 bg-[#282828] flex grow justify-left pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/" class="text-[#CBD5E1]"> Fuel Quote History </a>

				<a href="/" class="text-[#CBD5E1]"> Payment History </a>
			</nav>
		</aside>
		<!-- * End Sidebar -->

		<!-- * Main Content -->
		<div class="w-5/6 bg-[#F0F5F8] flex flex-col flex-wrap pb-10">
			<p class="text-3xl pl-8 pt-4">Dashboard</p>
			<div class="flex flex-col">
				<div class="w-5/6 pl-7 pt-4">
					<!-- * Cards -->
					<section class="flex flex-row grow h-full flex-wrap gap-5">
						<!-- Name Card -->
						<div class="w-[30rem] h-[26rem] px-8 py-5 bg-white flex flex-col rounded-xl">
							<div class="flex flex-col text-lg font-bold text-black">Full Name</div>
							<form on:submit={handleNameSubmit}>
								<div class="flex flex-col">
									<label class="mt-4 text-gray-800" for="first-name">First Name</label>
									<input
										class={textBoxStyle}
										type="text"
										id="first-name"
										bind:value={name.firstName}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="middle-name">Middle Name</label>
									<input
										class={textBoxStyle}
										type="text"
										id="middle-name"
										bind:value={name.middleName}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">Last Name</label>
									<input
										class={textBoxStyle}
										type="text"
										id="last-name"
										bind:value={name.lastName}
									/>
								</div>

								<div class="flex flex-row justify-end pt-20">
									<button
										type="submit"
										class="py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
										>Submit</button
									>
								</div>
							</form>
						</div>

						<!-- Payment Card -->
						<div class="w-[30rem] h-[26rem] px-8 py-5 bg-white flex flex-col rounded-xl">
							<div class="text-lg font-bold text-black">Payment Information</div>
							<form on:submit={handlePaymentSubmit}>
								<div class="flex flex-col">
									<label class="mt-4 text-gray-800" for="first-name">Card Name</label>
									<input
										class={textBoxStyle}
										type="text"
										id="first-name"
										bind:value={payment.cardName}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="middle-name">Card Number</label>
									<input
										class={textBoxStyle}
										type="text"
										id="middle-name"
										bind:value={payment.cardNumber}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">Expiration Date</label>
									<input
										class={textBoxStyle}
										type="text"
										id="last-name"
										bind:value={payment.expirationDate}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">CCV</label>
									<input class={textBoxStyle} type="text" id="last-name" bind:value={payment.ccv} />
								</div>

								<div class="flex flex-row justify-end pt-4">
									<button
										type="submit"
										class="py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
										>Submit</button
									>
								</div>
							</form>
						</div>

						<!-- Address Card -->
						<div class="w-[30rem] h-[26rem] px-8 py-5 bg-white flex flex-col rounded-xl">
							<div class="text-lg font-bold text-black">Address</div>
							<form on:submit={handleAddressSubmit}>
								<div class="flex flex-col">
									<label class="mt-4 text-gray-800" for="first-name">Address</label>
									<input
										class={textBoxStyle}
										type="text"
										id="first-name"
										bind:value={address.address1}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="middle-name">City</label>
									<input
										class={textBoxStyle}
										type="text"
										id="middle-name"
										bind:value={address.city}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">State</label>
									<input
										class={textBoxStyle}
										type="text"
										id="last-name"
										bind:value={address.state}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">Zip Code</label>
									<input class={textBoxStyle} type="text" id="last-name" bind:value={address.zip} />
								</div>

								<div class="flex flex-row justify-end pt-4">
									<button
										type="submit"
										class="py-3 px-4 inline-flex gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none"
										>Submit</button
									>
								</div>
							</form>
						</div>
					</section>
					<!-- * End Cards -->
				</div>
			</div>
		</div>
		<!-- * End Main Content -->
	</main>
	<footer>
		<Footer />
	</footer>
</section>
