<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import InputForm from '$lib/components/inputForm.svelte';
	import { failureAlert, successAlert } from '$lib/components/toasts/customToasts';
	import { postRequest } from '$lib/requests';
	import { goto } from '$app/navigation';

	const regTopDescription = 'Make a new account to access gas savings you could only dream of!';
	const regBottomDescription = 'Already have an account? <a href="/login"><u>Log in here.</u></a>';

	interface InputValue {
		inputLabel: string;
		inputValue: string;
	}

	let registrationVals: InputValue[] = [];
	function handleRegInputChange(e: any) {
		registrationVals = e.detail;
	}

	async function handleRegistrationSubmit() {
		if(registrationVals.length < 3 || !registrationVals[0].inputValue || !registrationVals[1].inputValue || !registrationVals[2].inputValue) {
			failureAlert("Registration form must be completely filled out!");
			return;
		}

		const registrationFormInfo = {
			email: registrationVals[0].inputValue,
			username: registrationVals[1].inputValue,
			password: registrationVals[2].inputValue
		};

		const registerRes = await postRequest('api/auth/register', {
			username: registrationFormInfo.username,
			password: registrationFormInfo.password
		});

		const resJSON = await registerRes.json();

		if(!resJSON.success) {
			if(resJSON.response.failType == "exists") {
				failureAlert(resJSON.response.message);
				return;
			}

			failureAlert("Registration failed due to error, please try again");
			return;
		}

		successAlert('Registration Succesful! Redirecting...');
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
			<InputForm
				numInputs={3}
				labels={['Email', 'Username', 'Password']}
				inputTypes={['email', 'text', 'password']}
				fromDescription={{
					title: 'Create Account',
					button: 'Register',
					top: regTopDescription,
					bottom: regBottomDescription
				}}
				bind:formInputValues={registrationVals}
				on:inputChange={handleRegInputChange}
				on:formSubmit={handleRegistrationSubmit}
			/>
		</div>
	</section>
</main>

<footer>
	<Footer />
</footer>
