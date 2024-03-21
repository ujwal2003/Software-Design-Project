<script lang="ts">
    import { getCookie } from "$lib/cookiesUtil";
	import { onMount } from "svelte";

    let cookieDat: any;

    onMount(async () => {
        try {
            cookieDat = getCookie('user_session');
        } catch (error) {
            console.error(error);
        }
    })
</script>

<p>{cookieDat}</p>