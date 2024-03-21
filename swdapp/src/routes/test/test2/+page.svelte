<script lang="ts">
    import { onMount } from "svelte";

    let cookieData: any;

    onMount(() => {
        const cookies = document.cookie.split(';');
        const cookieMap: any = {};
        cookies.forEach(cookie => {
            const [name, value] = cookie.split('=');
            cookieMap[name.trim()] = decodeURIComponent(value);
        });

        const yourCookieData = cookieMap['user_session'];

        if(yourCookieData) {
            cookieData = JSON.parse(yourCookieData);
        }
    });
</script>

<p>{JSON.stringify(cookieData)}</p>