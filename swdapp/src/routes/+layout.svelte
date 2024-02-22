<script lang="ts">
	import '../app.css';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		(window as any).HSStaticMethods.autoInit();
	});
</script>

<main class="overflow-x-hidden">
	<slot />
</main>
