<script lang="ts">
	import Header from "$lib/components/header.svelte";
	import Footer from "$lib/components/footer.svelte";
	import InputForm from "$lib/components/inputForm.svelte";

	const regTopDescription = "Make a new account to access gas savings you could only dream of!";
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
		console.log("Registration Submission Clicked!");
	}
</script>

<nav>
	<Header />
</nav>

<main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-0 max-h-full">
	<!-- left side -->
	<section class="w-1/2 bg-[#282828] h-screen flex items-center justify-center mt-0">
		<quote class="text-white flex flex-col gap-4 mt-[25rem]">
			<p class="text-center text-wrap text-3xl font-bold italic">
				&ldquo;My car started to fly after using FuelFinder&rdquo;
			</p>
			<p class="text-xl flex flex-row-reverse pr-16">- Generic Car Owner</p>
		</quote>
	</section>

	<!-- right side -->
	<section class="w-1/2 bg-[#F0F5F8] h-screen flex flex-wrap items-center justify-center">
		<div class="w-1/2">
			<InputForm
				numInputs={3}
				labels={["Email", "Username", "Password"]}
				inputTypes={["email", "text", "password"]}
				fromDescription={{
					title: "Create Account",
					button: "Register",
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
