<script>
	export let textColor = 'text-gray-500';
</script>

<footer class="relative z-10 w-screen overflow-hidden">
	<div class="mx-auto w-full max-w-[85rem] bg-transparent px-4 py-4 sm:px-6 lg:px-8">
		<!-- Grid -->
		<div class="text-center">
			<div>
				<a class="font-modak flex-none text-pretty text-3xl" href="/">
					<h1>FUEL<span class="text-logo">FINDER</span></h1>
				</a>
			</div>
			<!-- End Col -->

			<div class={textColor}>
				<p class={textColor}>
					Built by <a href="https://github.com/SageCT" class="underline underline-offset-2"
						>Sage Turner</a
					>,
					<a href="https://github.com/ujwal2003" class="underline underline-offset-2">Ujwal Joshi</a
					>,
					<a href="https://github.com/altonph" class="underline underline-offset-2"> Alton Phan</a>,
					and
					<a href="https://github.com/yonatandeneke" class="underline underline-offset-2"
						>Yonatan Deneke</a
					>.
				</p>
				<p>For Singh COSC4353.</p>
			</div>

			<!-- Github Link -->
			<div class="mt-1 space-x-2">
				<a
					class="inline-flex size-10 items-center justify-center text-center {textColor} rounded-full transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white"
					href="https://github.com/ujwal2003/Software-Design-Project"
				>
					<svg
						class="size-3.5 flex-shrink-0"
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						fill="currentColor"
						viewBox="0 0 16 16"
					>
						<path
							d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
						/>
					</svg>
				</a>
			</div>
			<!-- End Github Link -->
		</div>
		<!-- End Grid -->
	</div>
</footer>
