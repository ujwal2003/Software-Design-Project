<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import InputForm from '$lib/components/inputForm.svelte';

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

	function handleRegistrationSubmit() {
		console.log('Registration Submission Clicked!');
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
