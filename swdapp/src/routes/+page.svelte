<script>
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<div class="">
	<nav class="">
		<Header homeHeader={true} />
	</nav>

	<!-- <h1 class="bg-background">HH</h1> -->
	<div class="relative overflow-hidden bg-gray-300 pt-[15rem] lg:pt-[15rem]">
		<!-- Hero -->

		<!-- Background Gradients -->
		<div aria-hidden="true" class="absolute start-1/2 top-96 flex -translate-x-1/2 transform">
			<div
				class="h-[44rem] w-[25rem] translate-x-[30rem] translate-y-[25rem] rotate-[-60deg] transform bg-gradient-to-r from-indigo-900/50 to-purple-800 blur-[6rem]"
			/>

			<div
				class="h-[44rem] w-[25rem] -translate-y-[20rem] translate-x-[100rem] rotate-[-75deg] transform bg-gradient-to-r from-violet-600/50 to-purple-900 blur-[6rem]"
			/>
			<div
				class="rounded-fulls h-[50rem] w-[90rem] origin-top-left -translate-x-[15rem] -rotate-12 bg-gradient-to-tl from-indigo-900/70 via-indigo-900/70 to-blue-900/70 blur-[6rem]"
			/>
			<div
				class="h-[55rem] w-[40rem] -translate-x-[20rem] translate-y-[20rem] rotate-[-60deg] transform bg-gradient-to-r from-violet-900/50 to-indigo-700 blur-[6rem]"
			/>
		</div>
		<!-- End Gradients -->

		<div class="relative z-10 h-screen lg:h-[70rem]">
			<div class="mx-auto max-w-[100rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
				<div class="mx-auto max-w-3xl text-center lg:max-w-[150rem]">
					<!-- Title -->
					<div class="mt-5 max-w-3xl lg:max-w-[150rem]">
						<h1
							class="block text-pretty text-4xl font-semibold text-gray-300 md:text-5xl lg:text-[6rem]"
						>
							Quotes for The Best Fuel in The <span
								class="to-accent bg-gradient-to-l from-violet-500 bg-clip-text text-transparent"
								>Galaxy</span
							>
						</h1>
					</div>
					<!-- End Title -->

					<div class="mt-5 max-w-3xl text-center lg:max-w-[150rem]">
						<p class="text-lg text-gray-100">
							Built by CS students, for finding the best prices in fuel.
						</p>
					</div>

					<!-- Buttons -->
					<div class="mt-8 flex justify-center gap-3">
						<a
							class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							href="/register"
						>
							Register Now
							<svg
								class="size-4 flex-shrink-0"
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
							class="inline-flex items-center gap-x-2 rounded-lg border border-gray-100 px-4 py-3 text-sm font-semibold text-gray-100 hover:border-gray-300 hover:text-gray-300 disabled:pointer-events-none disabled:opacity-50"
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
