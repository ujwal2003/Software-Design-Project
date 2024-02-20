<script>
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
</script>

<div>
	<nav class="">
		<Header />
	</nav>

	<!-- <h1 class="bg-background">HH</h1> -->

	<!-- Hero -->
	<div class="relative overflow-hidden pt-[25rem]">
		<!-- Gradients -->
		<div aria-hidden="true" class="flex absolute top-96 start-1/2 transform -translate-x-1/2">
			<div
				class="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem] dark:from-violet-900/50 dark:to-purple-900"
			></div>
			<div
				class="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-[100px] w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem] dark:from-indigo-900/70 dark:via-indigo-900/70 dark:to-blue-900/70"
			></div>
		</div>
		<!-- End Gradients -->

		<div class="relative z-10 h-[70rem]">
			<div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
				<div class="max-w-2xl text-center mx-auto">
					<!-- <p
						class="inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400"
					>
						Preline: A vision for 2023
					</p> -->

					<!-- Title -->
					<div class="mt-5 max-w-2xl">
						<h1 class="block font-semibold text-gray-700 text-4xl md:text-5xl lg:text-6xl">
							Quotes for The Best Fuel in The <span
								class="bg-gradient-to-l bg-clip-text from-accent to-violet-400 text-transparent"
								>Galaxy</span
							>
						</h1>
					</div>
					<!-- End Title -->

					<div class="mt-5 max-w-3xl">
						<p class="text-lg text-gray-100">
							Built by poor CS students, for car owners. FuelFinder is the best way to keep your car
							going.
						</p>
					</div>

					<!-- Buttons -->
					<div class="mt-8 gap-3 flex justify-center">
						<a
							class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							href="/"
						>
							Get started
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
						<a
							class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
							href="/"
						>
							<svg
								class="flex-shrink-0 size-4"
								width="19"
								height="18"
								viewBox="0 0 19 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6.875 18C8.531 18 9.875 16.656 9.875 15V12H6.875C5.219 12 3.875 13.344 3.875 15C3.875 16.656 5.219 18 6.875 18Z"
									fill="#0ACF83"
								></path>
								<path
									d="M3.875 9C3.875 7.344 5.219 6 6.875 6H9.875V12H6.875C5.219 12 3.875 10.656 3.875 9Z"
									fill="#A259FF"
								></path>
								<path
									d="M3.875 3C3.875 1.344 5.219 0 6.875 0H9.875V6H6.875C5.219 6 3.875 4.656 3.875 3Z"
									fill="#F24E1E"
								></path>
								<path
									d="M9.87501 0H12.875C14.531 0 15.875 1.344 15.875 3C15.875 4.656 14.531 6 12.875 6H9.87501V0Z"
									fill="#FF7262"
								></path>
								<path
									d="M15.875 9C15.875 10.656 14.531 12 12.875 12C11.219 12 9.87501 10.656 9.87501 9C9.87501 7.344 11.219 6 12.875 6C14.531 6 15.875 7.344 15.875 9Z"
									fill="#1ABCFE"
								></path>
							</svg>
							Preline Figma
						</a>
					</div>
					<!-- End Buttons -->
				</div>
			</div>
		</div>
	</div>
	<!-- End Hero -->
</div>

<footer>
	<Footer />
</footer>
