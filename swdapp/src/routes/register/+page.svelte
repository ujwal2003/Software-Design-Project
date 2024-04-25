<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import SubmitForm from '$lib/components/submission-form/submitForm.svelte';
	import FormText from '$lib/components/submission-form/formText.svelte';
	import FormInput from '$lib/components/submission-form/formInput.svelte';
	import FormButton from '$lib/components/submission-form/formButton.svelte';

	import { failureAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { postRequest } from '$lib/requests';
	import { goto } from '$app/navigation';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';

	const regTopDescription = 'Make a new account to access gas savings you could only dream of!';
	const regBottomDescription = 'Already have an account? <a href="/login"><u>Log in here.</u></a>';

	let registerRequest = {
		username: '',
		password: ''
	};

	type RegLabel = "username" | "password";
	function handleRegInputChange(e: any, inpType: RegLabel): void {
		registerRequest = {
			username: (inpType == 'username') ? e.detail : registerRequest.username,
			password: (inpType == 'password') ? e.detail : registerRequest.password
		}
	}

	let loadingVisible = false;
	async function handleRegistrationSubmit() {
		loadingVisible = true;
		if(!registerRequest.username || !registerRequest.password) {
			failureAlert("Registration form must be completely filled out!");
			loadingVisible = false;
			return;
		}

		const registerRes = await postRequest('api/auth/register', registerRequest);
		const resJSON = await registerRes.json();

		if(!resJSON.success) {
			if(resJSON.response.failType == "exists") {
				failureAlert(resJSON.response.message);
				loadingVisible = false;
				return;
			}

			failureAlert("Registration failed due to error, please try again");
			loadingVisible = false;
			return;
		}

		successAlert('Registration Succesful! Redirecting...');
		loadingVisible = false;
		goto('/login/verify/');
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
	<section class="flex h-screen w-1/2 flex-wrap items-center justify-center bg-[#F0F5F8]">
		<div class="w-1/2">
			{#if loadingVisible}			
				<div class="mb-2">
					<LoadingSpinner>
						Registering...
					</LoadingSpinner>
				</div>
			{/if}

			<SubmitForm>
				<FormText title>Create Account</FormText>
				<FormText description>{regTopDescription}</FormText>

				<FormInput inputType='text' placeholderText='Username' on:formInput={e => {handleRegInputChange(e, 'username')}} />
				<FormInput inputType='password' placeholderText='Password' on:formInput={e => {handleRegInputChange(e, 'password')}} />

				<FormButton justify='end' on:formClick={handleRegistrationSubmit}>
					Register
				</FormButton>

				<FormText description>{@html regBottomDescription}</FormText>
			</SubmitForm>
		</div>
	</section>
</main>

<footer>
	<Footer />
</footer>
