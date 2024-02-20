<script>
	import '../app.css';
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		window.HSStaticMethods.autoInit();
	});
</script>

<main>
	<slot />
</main>
