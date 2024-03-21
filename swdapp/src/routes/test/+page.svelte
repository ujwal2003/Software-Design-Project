<script lang="ts">
	import { postRequest } from "$lib/requests";
	import { onMount } from "svelte";

	let resData: Object;

	onMount(async () => {
		try {
			const res = await postRequest('api/auth/login', {
				username: "dummyUser1",
				password: "unsecurePassword1"
			});

			const jsonDat = await res.json();

			document.cookie = `user_session=${JSON.stringify(jsonDat)}; expires=${new Date(Date.now() + 5 * 60 * 1000).toUTCString()}`;
			resData = jsonDat;

		} catch (error) {
			console.error('Error fetching data:', error);
		}
	});
</script>

<main class="flex justify-center mt-14">
	<p>{JSON.stringify(resData)}</p>
</main>
