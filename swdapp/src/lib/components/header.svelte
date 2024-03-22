<script lang="ts">
	import { getCookie } from "$lib/cookieUtil";
	import { onMount } from "svelte";

	// Variable to control the header transparency for home
	export let homeHeader: boolean = false;
	export let buttonColor: string = 'bg-blue-600';
	export let buttonTextColor: string = 'text-white';

	let headerStyles: string = '';

	let currUser: string;
	let loggedIn: boolean;
	onMount(async () => {
		const cookieDat = getCookie('user_session');
		if(!cookieDat) {
			loggedIn = false;
		} else {
			loggedIn = true;
			currUser = JSON.parse(cookieDat).username;
		}
	});

	homeHeader
		? (headerStyles = 'absolute bg-transparent top-0 z-10 w-screen bg-transparent overflow-hidden')
		: (headerStyles = 'relative bg-white z-10 w-screen bg-orange overflow-hidden');
</script>

<header class={headerStyles}>
	<div class="z-50 flex w-full flex-wrap py-4 text-sm sm:flex-nowrap sm:justify-start">
		<nav
			class="mx-auto w-full max-w-full px-10 sm:flex sm:items-center sm:justify-between"
			aria-label="Global"
		>
			<div class="flex items-center justify-between">
				<a class="font-modak flex-none text-pretty text-3xl" href="/">
					<h1>FUEL<span class="text-logo">FINDER</span></h1>
				</a>
				<!-- Navbar for Mobile -->
				<div class="sm:hidden">
					<button
						type="button"
						class="hs-collapse-toggle inline-flex items-center justify-center gap-x-2 rounded-lg border border-gray-200 bg-white p-2 text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
						data-hs-collapse="#navbar-collapse-with-animation"
						aria-controls="navbar-collapse-with-animation"
						aria-label="Toggle navigation"
					>
						<svg
							class="hs-collapse-open:hidden size-4 flex-shrink-0"
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
							class="hs-collapse-open:block hidden size-4 flex-shrink-0"
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
				<!-- End Navbar for Mobile -->
			</div>
			<div
				id="navbar-collapse-with-animation"
				class="hs-collapse hidden grow basis-full overflow-hidden transition-all duration-300 sm:block"
			>
				<div
					class="mt-5 flex flex-col gap-5 text-lg sm:mt-0 sm:flex-row sm:items-center sm:justify-end sm:ps-5"
				>
					<a class="font-medium text-gray-600 hover:text-gray-400" href="/" aria-current="page"
						>Home</a
					>
					{#if loggedIn}
						<a class="font-medium text-gray-600 hover:text-gray-400" href="/profile">Account</a>
						<button class="font-medium text-gray-600 hover:text-gray-400">
							Logout
						</button>
					{:else}
						<a class="font-medium text-gray-600 hover:text-gray-400" href="/login">Login</a>
						<button
							type="button"
							class="inline-flex items-center gap-x-2 rounded-lg border border-transparent px-3 py-2 text-sm font-semibold {buttonColor} {buttonTextColor} hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
						>
							<a href="/register">Register</a>
						</button>
					{/if}
					
				</div>
			</div>
		</nav>
	</div>
</header>
