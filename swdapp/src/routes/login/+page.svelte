<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import InputForm from '$lib/components/inputForm.svelte';

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

	function handleLoginSubmit() {
		console.log('Login Submission Clicked!');
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
	<section class="w-1/2 bg-[#F0F5F8] flex flex-wrap items-center justify-center">
		<div class="w-1/2">
			<InputForm
				numInputs={2}
				labels={['Username or Email', 'Password']}
				inputTypes={['email', 'password']}
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
