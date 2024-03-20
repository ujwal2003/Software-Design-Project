<script lang="ts">
	import { successAlert, failureAlert, genericAlert } from "$lib/components/toasts/customToasts";

	let alertText = "You got a toast alert!";
</script>

<main class="flex justify-center mt-14">
	<button on:click={() => successAlert(alertText)}>CLICK FOR TOAST!</button>
</main>
