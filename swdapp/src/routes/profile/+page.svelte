<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert, genericAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	import { postRequest } from '$lib/requests';
	import { getCookie } from '$lib/cookieUtil';

	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("please log in to access this page");
			goto('/login');
		}
		getUserData();
	});

	// Input variables
	// let name = {
	// 	firstName: '',
	// 	middleName: '',
	// 	lastName: ''
	// };

	let payment = {
		cardName: '',
		cardNumber: '',
		expirationDate: '',
		CVV: ''
	};

	// let address = {
	// 	address1: '',
	// 	city: '',
	// 	state: '',
	// 	zip: ''
	// };

	interface UserProfile {
		firstName: string;
		middleName: string;
		lastName: string;
	}

	interface UserAddress {
		//street: string;
		address1: string;
		city: string;
		state: string;
		zip: string;
	}

	interface UserPayment {
		cardName: '';
		cardNumber: '';
		expirationDate: '';
		CVV: '';
	};

	let userProfile : UserProfile = { firstName: '', middleName: '', lastName: ''};
	let userAddress : UserAddress = { address1: '', city: '', state: '', zip: ''};
	let userPayment : UserPayment = { cardName: '', cardNumber: '', expirationDate: '', CVV: ''};
	//let userAddress : UserAddress = { string: '', city: '', state: '', zip: ''};

	async function getUserData() {

		const cookie = getCookie('user_session');

		if (!cookie) {
			return;
		}

		let profileReq = JSON.parse(cookie);
		// console.log(profileReq.username);
		// console.log(profileReq.accessToken);

		const profileAPIRes = await postRequest('api/profile/info', profileReq);
		const profileResJSON = await profileAPIRes.json();

		if(!profileResJSON.success || profileResJSON.unauthorized) {
			return;
		}

		userProfile = {
			firstName: profileResJSON.firstName,
			middleName: profileResJSON.middleName,
			lastName: profileResJSON.lastName
		};
		
		/*
		userPayment = {
			cardName: profileResJSON.cardName,
			cardNumber: profileResJSON.cardNumber,
			expirationDate: profileResJSON.expirationDate,
			CVV: profileResJSON.CVV
		};
		*/

		const locationString = profileResJSON.location;
		const locationParts = locationString.split(" ");
		//console.log(locationParts);

		userAddress = {
			address1: locationParts[0],
			city: locationParts[1],
			state: locationParts[2],
			zip: locationParts[3]
		};

		/*
		userAddress = {
			string: profileResJSON.string,
			city: profileResJSON.city,
			state: profileResJSON.state,
			zip: profileResJSON.zip
		};
		*/

	}

	// Input Form Handling
	function handleSubmit(e: any) {
		// console.log('First Name:', userProfile.firstName);
		// console.log('Middle Name:', userProfile.middleName);
		// console.log('Last Name:', userProfile.lastName);
		// console.log('Name Submitted');
		
		// console.log('Address 1:', userAddress.address1);
		// console.log('City:', userAddress.city);
		// console.log('State:', userAddress.state);
		// console.log('Zipcode:', userAddress.zip);
		// console.log('Address Submitted');

		// console.log('Card Name:', userPayment.cardName);
		// console.log('Card Number:', userPayment.cardNumber);
		// console.log('Expiration Date:', userPayment.expirationDate);
		// console.log('CVV:', userPayment.CVV);
		// console.log('Payment Submitted');
	}

	let nameFormDisabled: boolean = true;

    function handleEdit(section: string) {
        if (section === 'name') {
            nameFormDisabled = false;
        }
    }

    function handleCancel(section: string) {
        if (section === 'name') {
            nameFormDisabled = true;
        }
    }

	// Input TextBox Styling
	let textBoxStyle = 'py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:frin-blue-500 disabled:opacity-50 disabled:pointer-events-none bg-slate-100';

</script>

<section class="flex flex-col">
	<nav>
		<Header />
	</nav>

	<main class="flex max-w-full flex-wrap overflow-auto">
		<!-- * Sidebar -->
		<aside class="justify-left flex min-h-screen w-1/6 grow bg-[#282828] pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/quotes" class="text-[#CBD5E1]"> Fuel Quote History </a>

				<a href="/receipts" class="text-[#CBD5E1]"> Payment History </a>
			</nav>
		</aside>
		<!-- * End Sidebar -->

		<!-- * Main Content -->
		<div class="flex w-5/6 grow flex-col flex-wrap bg-[#F0F5F8] pb-10">
			<p class="pl-8 pt-4 text-3xl">Dashboard</p>
			<div class="flex w-5/6 flex-col">
				<div class="pl-7 pt-4">
					<!-- * Cards -->
					<section class="mx-auto flex h-full w-full grow flex-row flex-wrap gap-5">
						<!-- Name Card -->
						<div class="flex h-[26rem] w-[30rem] flex-col rounded-xl bg-white px-8 py-5">
							<div class="flex flex-col text-lg font-bold text-black">Full Name</div>
							<form on:submit={handleSubmit}>
								<div class="flex flex-col">
									<label class="mt-4 text-gray-800" for="first-name">First Name</label>
									<input 
										disabled={nameFormDisabled}
										class={textBoxStyle}
										type="text"
										id="first-name"
										bind:value={userProfile.firstName}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="middle-name">Middle Name</label>
									<input
										disabled={nameFormDisabled}
										class={textBoxStyle}
										type="text"
										id="middle-name"
										bind:value={userProfile.middleName}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">Last Name</label>
									<input 
										disabled={nameFormDisabled}
										class={textBoxStyle}
										type="text"
										id="last-name"
										bind:value={userProfile.lastName}
									/>
								</div>

								<div class="flex flex-row justify-end pt-20 gap-4">
									{#if nameFormDisabled}
										<button
											on:click={() => handleEdit('name')}
											type="button"
											class="inline-flex gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
											>
										Edit
										</button>
										{:else}
										<div class="flex gap-x-2">
											<button
												on:click={() => handleCancel('name')}
												type="button"
												class="inline-flex rounded-lg border border-transparent bg-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-400"
											>
											Cancel
											</button>
											<button
												type="submit"
												class="inline-flex rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
											>
												Submit
											</button>
										</div>
									{/if}
								</div>
							</form>
						</div>

						<!-- Payment Card -->
						<!-- TODO: change bind from payment to userPayment -->
						<div class="flex h-[26rem] w-[30rem] flex-col rounded-xl bg-white px-8 py-5">
							<div class="text-lg font-bold text-black">Payment Information</div>
							<form on:submit={handleSubmit}>
								<div class="flex flex-col">
									<label class="mt-4 text-gray-800" for="first-name">Card Name</label>
									<input 
										disabled={nameFormDisabled}
										class={textBoxStyle}
										type="text"
										id="first-name"
										bind:value={payment.cardName}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="middle-name">Card Number</label>
									<input
										disabled={nameFormDisabled}
										class={textBoxStyle}
										type="text"
										id="middle-name"
										bind:value={payment.cardNumber}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">Expiration Date</label>
									<input
										disabled={nameFormDisabled}
										class={textBoxStyle}
										type="text"
										id="last-name"
										bind:value={payment.expirationDate}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">CVV</label>
									<input 
										disabled={nameFormDisabled}
										class={textBoxStyle} 
										type="text" 
										id="last-name" 
										bind:value={payment.CVV} />
								</div>

								<div class="flex flex-row justify-end pt-4">
									{#if nameFormDisabled}
										<button
											on:click={() => handleEdit('name')}
											type="button"
											class="inline-flex gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
											>
										Edit
										</button>
										{:else}
										<div class="flex gap-x-2">
											<button
												on:click={() => handleCancel('name')}
												type="button"
												class="inline-flex rounded-lg border border-transparent bg-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-400"
											>
											Cancel
											</button>
											<button
												type="submit"
												class="inline-flex rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
											>
												Submit
											</button>
										</div>
									{/if}
								</div>
							</form>
						</div>

						<!-- Address Card -->
						<div class="flex h-[26rem] w-[30rem] flex-col rounded-xl bg-white px-8 py-5">
							<div class="text-lg font-bold text-black">Address</div>
							<form on:submit={handleSubmit}>
								<div class="flex flex-col">
									<label class="mt-4 text-gray-800" for="first-name">Address</label>
									<input disabled
										class={textBoxStyle}
										type="text"
										id="first-name"
										bind:value={userAddress.address1}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="middle-name">City</label>
									<input disabled
										class={textBoxStyle}
										type="text"
										id="middle-name"
										bind:value={userAddress.city}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">State</label>
									<input disabled
										class={textBoxStyle}
										type="text"
										id="last-name"
										bind:value={userAddress.state}
									/>
								</div>
								<div class="flex flex-col">
									<label class="mt-2 text-gray-800" for="last-name">Zip Code</label>
									<input disabled
										class={textBoxStyle} 
										type="text" 
										id="last-name" 
										bind:value={userAddress.zip} />
								</div>

								<div class="flex flex-row justify-end pt-4">
									{#if nameFormDisabled}
										<button
											on:click={() => handleEdit('name')}
											type="button"
											class="inline-flex gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50"
											>
										Edit
										</button>
										{:else}
										<div class="flex gap-x-2">
											<button
												on:click={() => handleCancel('name')}
												type="button"
												class="inline-flex rounded-lg border border-transparent bg-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-400"
											>
											Cancel
											</button>
											<button
												type="submit"
												class="inline-flex rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900"
											>
												Submit
											</button>
										</div>
									{/if}
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
