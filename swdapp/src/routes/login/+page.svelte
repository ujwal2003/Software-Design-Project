<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import InputForm from '$lib/components/inputForm.svelte';
	import { failureAlert, genericAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { postRequest } from '$lib/requests';
	import { deleteCookie, setCookie } from '$lib/cookieUtil';
	import { goto } from '$app/navigation';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';

	const loginTopDescription =
		'Once you login you can create new quotes, and set your quote search settings!';
	const loginBottomDescription =
		'Don\'t have an account? <a href="/register"><u>Register here.</u></a>';

	interface InputValue {
		inputLabel: string;
		inputValue: string;
	}

	let loginVals: InputValue[] = [];
	function handleLoginInputChange(e: any) {
		loginVals = e.detail;
	}

	let loginLoadingVisible = false;
	async function handleLoginSubmit() {
		if(loginVals.length < 2 || !loginVals[0].inputValue || !loginVals[1].inputValue) {
			failureAlert('login fields cannot be empty!');
			return;
		}

		loginLoadingVisible = true;

		const loginReq = {
			username: loginVals[0].inputValue,
			password: loginVals[1].inputValue
		}

		const loginAPIRes = await postRequest('api/auth/login', loginReq);
		const loginResJSON = await loginAPIRes.json();
		
		if(!loginResJSON.success) {
			const failReason = loginResJSON.response.failType;
			loginLoadingVisible = false;

			if(failReason == "invalid_user") {
				failureAlert(`${loginReq.username} not found, please register first if you do not have an account.`);
				return;
			} else if(failReason == "invalid_pass") {
				failureAlert("The password you entered is incorrect.");
				return;
			}

			failureAlert("login failed due to internal error, please try again");
			return;
		}

		successAlert("login succesful. Redirecting...");

		deleteCookie('user_session');
		setCookie('user_session', JSON.stringify({
			username: loginReq.username,
			accessToken: loginResJSON.response.accessToken,
			refreshToken: loginResJSON.response.refreshToken
		}));

		loginLoadingVisible = false;
		goto('/profile');
	}
</script>

<nav>
	<Header />
</nav>

<main class="mt-0 flex max-h-full max-w-full flex-wrap overflow-hidden overflow-x-hidden">
	<!-- left side -->
	<section class="mt-0 flex h-screen w-1/2 items-center justify-center bg-[#282828]">
		<quote class="mt-[25rem] flex flex-col gap-4 text-white">
			<p class="text-wrap text-center text-3xl font-bold italic">
				&ldquo;My car started to fly after using FuelFinder&rdquo;
			</p>
			<p class="flex flex-row-reverse pr-16 text-xl">- Generic Car Owner</p>
		</quote>
	</section>

	<!-- right side -->
	<section class="flex w-1/2 flex-wrap items-center justify-center bg-[#F0F5F8]">
		<div class="w-1/2">
			{#if loginLoadingVisible}			
				<div class="mb-2">
					<LoadingSpinner>Logging in...</LoadingSpinner>
				</div>
			{/if}

			<InputForm
				numInputs={2}
				labels={['Username', 'Password']}
				inputTypes={['text', 'password']}
				fromDescription={{
					title: 'Login to An Existing Account',
					button: 'Login',
					top: loginTopDescription,
					bottom: loginBottomDescription
				}}
				bind:formInputValues={loginVals}
				on:inputChange={handleLoginInputChange}
				on:formSubmit={handleLoginSubmit}
			/>
		</div>
	</section>
</main>

<footer>
	<Footer />
</footer>
