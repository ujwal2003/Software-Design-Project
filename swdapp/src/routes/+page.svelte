<script>
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<div>
	<nav class="">
		<Header />
	</nav>

	<!-- <h1 class="bg-background">HH</h1> -->
	<div class="relative overflow-hidden pt-[15rem] lg:pt-[25rem] bg-gray-300">
		<!-- Hero -->

		<!-- Background Gradients -->
		<div aria-hidden="true" class="flex absolute top-96 start-1/2 transform -translate-x-1/2">
			<div
				class="bg-gradient-to-r from-indigo-900/50 to-purple-800 blur-[6rem] w-[25rem] h-[44rem] rotate-[-60deg] transform translate-x-[30rem] translate-y-[25rem]"
			/>

			<div
				class="bg-gradient-to-r from-violet-600/50 to-purple-900 blur-[6rem] w-[25rem] h-[44rem] rotate-[-75deg] transform translate-x-[100rem] -translate-y-[20rem]"
			/>
			<div
				class="bg-gradient-to-tl from-indigo-900/70 via-indigo-900/70 to-blue-900/70 blur-[6rem] w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]"
			/>
			<div
				class="bg-gradient-to-r from-violet-900/50 to-indigo-700 blur-[6rem] w-[40rem] h-[55rem] rotate-[-60deg] transform -translate-x-[20rem] translate-y-[20rem]"
			/>
		</div>
		<!-- End Gradients -->

		<div class="relative z-10 h-screen lg:h-[70rem]">
			<div class="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
				<div class="max-w-3xl lg:max-w-[150rem] text-center mx-auto">
					<!-- Title -->
					<div class="mt-5 max-w-3xl lg:max-w-[150rem]">
						<h1
							class="block font-semibold text-gray-300 text-4xl text-pretty md:text-5xl lg:text-[6rem]"
						>
							Quotes for The Best Fuel in The <span
								class="bg-gradient-to-l bg-clip-text from-violet-500 to-accent text-transparent"
								>Galaxy</span
							>
						</h1>
					</div>
					<!-- End Title -->

					<div class="mt-5 max-w-3xl lg:max-w-[150rem] text-center">
						<p class="text-lg text-gray-100">
							Built by CS students, for finding the best prices in fuel.
						</p>
					</div>

					<!-- Buttons -->
					<div class="mt-8 gap-3 flex justify-center">
						<a
							class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							href="/register"
						>
							Register Now
							<svg
								class="flex-shrink-0 size-4"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
							>
						</a>

						<button
							type="button"
							class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-100 text-gray-100 hover:border-gray-300 hover:text-gray-300 disabled:opacity-50 disabled:pointer-events-none"
						>
							<a href="/login">Login</a>
						</button>
					</div>
					<!-- End Buttons -->
				</div>
			</div>
		</div>
		<footer>
			<Footer />
		</footer>
	</div>
	<!-- End Hero -->
</div>
