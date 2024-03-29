<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import { onMount } from 'svelte';
	import { isClientAllowed } from '$lib/protected';
	import { failureAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { goto } from '$app/navigation';
	import { postRequest, patchRequest } from '$lib/requests';
	import { getCookie } from '$lib/cookieUtil';

	onMount(async () => {
		if(!await isClientAllowed()) {
			failureAlert("please log in to access this page");
			goto('/login');
		}
		getUserData();
	});

	interface UserProfile {
		firstName: string;
		middleName: string;
		lastName: string;
	}

	interface UserAddress {
		street: string;
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
	let userAddress : UserAddress = { street: '', city: '', state: '', zip: ''};
	let userPayment : UserPayment = { cardName: '', cardNumber: '', expirationDate: '', CVV: ''};

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

			userProfile = {
				firstName: profileResJSON.profile.firstName,
				middleName: profileResJSON.profile.middleName,
				lastName: profileResJSON.profile.lastName
			};

			userPayment = {
				cardName: profileResJSON.paymentInfo.cardName,
				cardNumber: profileResJSON.paymentInfo.cardNumber,
				expirationDate: profileResJSON.paymentInfo.expiration.slice(0, 10),
				CVV: profileResJSON.paymentInfo.cardCVV
			};

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

	// Input Form Handling
	async function handleSubmit() {
		try {
			const updatedProfileData = {
				firstName: userProfile.firstName,
				middleName: userProfile.middleName,
				lastName: userProfile.lastName,
				street: userAddress.street,
				city: userAddress.city,
				state: userAddress.state,
				zip: userAddress.zip
			};

			const updatedPaymentData = {
				cardName: userPayment.cardName,
				cardNum: userPayment.cardNumber,
				cvv: userPayment.CVV,
				expiry: userPayment.expirationDate
			};

			const cookie = getCookie('user_session');
			if (!cookie) {
				return;
			}

			const tokenData = JSON.parse(cookie);

			const patchRes = await patchRequest('api/profile/update', {
				...tokenData,
				profileUpdates: updatedProfileData,
				paymentUpdates: updatedPaymentData
			});

			if (patchRes.ok) {
				successAlert("Profile updated successfully");
				await getUserData();
			} else {
				const patchResJSON = await patchRes.json();
				if (patchResJSON && patchResJSON.message) {
					failureAlert(patchResJSON.message);
				} else {
					failureAlert("Failed to update profile and payment information");
				}
			}
		} catch (error) {
			console.error("Error updating profile and payment information:", error);
			failureAlert("Failed to update profile and payment information due to an error");
		}
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
                                                on:click={() => {
                                                    handleSubmit();
                                                    handleCancel('name');
                                                }}
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
                        <div class="flex h-[26rem] w-[30rem] flex-col rounded-xl bg-white px-8 py-5">
                            <div class="text-lg font-bold text-black">Payment Information</div>
                            <form on:submit={handleSubmit}>
                                <div class="flex flex-col">
                                    <label class="mt-4 text-gray-800" for="card-name">Card Name</label>
                                    <input 
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text"
                                        id="card-name"
                                        bind:value={userPayment.cardName}
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <label class="mt-2 text-gray-800" for="card-number">Card Number</label>
                                    <input
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text"
                                        id="card-number"
                                        bind:value={userPayment.cardNumber}
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <label class="mt-2 text-gray-800" for="expiration-date">Expiration Date</label>
                                    <input
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text"
                                        id="expiration-date"
                                        bind:value={userPayment.expirationDate}
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <label class="mt-2 text-gray-800" for="cvv">CVV</label>
                                    <input 
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle} 
                                        type="text" 
                                        id="cvv" 
                                        bind:value={userPayment.CVV} />
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
                                                on:click={() => {
                                                    handleSubmit();
                                                    handleCancel('name');
                                                }}
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
                                    <label class="mt-4 text-gray-800" for="street">Address</label>
                                    <input
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text"
                                        id="street"
                                        bind:value={userAddress.street}
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <label class="mt-2 text-gray-800" for="city">City</label>
                                    <input
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text"
                                        id="city"
                                        bind:value={userAddress.city}
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <label class="mt-2 text-gray-800" for="state">State</label>
                                    <input
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text"
                                        id="state"
                                        bind:value={userAddress.state}
                                    />
                                </div>
                                <div class="flex flex-col">
                                    <label class="mt-2 text-gray-800" for="zip">Zip Code</label>
                                    <input
                                        disabled={nameFormDisabled}
                                        class={textBoxStyle}
                                        type="text" 
                                        id="zip" 
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
                                                on:click={() => {
                                                    handleSubmit();
                                                    handleCancel('name');
                                                }}
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