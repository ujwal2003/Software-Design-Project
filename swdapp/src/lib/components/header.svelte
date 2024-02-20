<script>
</script>

<header class="absolute top-0 z-10 w-screen bg-transparent">
	<div class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full text-sm py-4">
		<nav
			class="max-w-full w-full mx-auto px-10 sm:flex sm:items-center sm:justify-between"
			aria-label="Global"
		>
			<div class="flex items-center justify-between">
				<a class="flex-none text-3xl font-modak text-pretty" href="/">
					<h1>FUEL<span class="text-logo">FINDER</span></h1>
				</a>
				<div class="sm:hidden">
					<button
						type="button"
						class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
						data-hs-collapse="#navbar-collapse-with-animation"
						aria-controls="navbar-collapse-with-animation"
						aria-label="Toggle navigation"
					>
						<svg
							class="hs-collapse-open:hidden flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line
								x1="3"
								x2="21"
								y1="18"
								y2="18"
							/></svg
						>
						<svg
							class="hs-collapse-open:block hidden flex-shrink-0 size-4"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg
						>
					</button>
				</div>
			</div>
			<div
				id="navbar-collapse-with-animation"
				class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block"
			>
				<div
					class="flex flex-col text-lg gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:ps-5"
				>
					<a class="font-medium text-blue-500" href="/" aria-current="page">Home</a>
					<a class="font-medium text-gray-600 hover:text-gray-400" href="/">Account</a>
					<a class="font-medium text-gray-600 hover:text-gray-400" href="/login">Login</a>
					<!-- TODO: CHAGE TO BUTTON AFTER CHECKPOINT -->
					<button
						type="button"
						class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
					>
						<a href="/register">Register</a>
					</button>
				</div>
			</div>
		</nav>
	</div>
</header>
