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
			<InputForm
				numInputs={2}
				labels={['Username or Email', 'Password']}
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
