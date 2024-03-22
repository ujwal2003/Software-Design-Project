<script lang="ts">
	// import { successAlert, failureAlert, genericAlert } from "$lib/components/toasts/customToasts";
	import { deleteCookie, getCookie } from "$lib/cookieUtil";
	import { isClientAllowed } from "$lib/protected";
	import { onMount } from "svelte";

	// let alertText = "You got a toast alert!";

	let username: string;
	onMount(() => {
		let cookieDat = getCookie('user_session');
		username = cookieDat ? JSON.parse(cookieDat).username : 'null';
	});

	function handleLogoutClick() {
		deleteCookie('user_session');
		location.reload();
	}
</script>

<main class="flex justify-center mt-14">
	<!-- <button on:click={() => successAlert(alertText)}>CLICK FOR TOAST!</button> -->

	<div class="flex-col gap-2">
		<div>
			{#await isClientAllowed()}
				<p>...loading</p>
			{:then output}
				{#if output}
					<p>hello {username}</p>
				{:else}
					<p>You are not logged in, please <a href="/login" class="underline text-sky-700">login</a>.</p>
				{/if}
			{:catch error}
				<p style="color: red">{error.message}</p>
			{/await}
		</div>

		<button class="border-2 rounded-lg p-1 border-black mt-2" on:click={handleLogoutClick}>
			logout
		</button>
	</div>
</main>
