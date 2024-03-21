<script lang="ts">
    import { deleteCookie, getCookie, setCookie } from "$lib/cookiesUtil";
	import { postRequest } from "$lib/requests";

    let displayData: any;

    async function handleCreateClick() {
        try {
            const loginRes = await postRequest('../api/auth/login', {
                username: "dummyUser1",
                password: "unsecurePassword1"
            });

            const loginResJSON = await loginRes.json();

            setCookie('user_session', JSON.stringify(loginResJSON));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleGetClick() {
        const cookieData = getCookie('user_session');
        displayData = cookieData;
    }

    function handleDeleteClick() {
        deleteCookie('user_session');
    }
</script>

<button class="rounded-lg border-2" on:click={handleCreateClick}>create cookie</button> <br>
<button class="rounded-lg border-2" on:click={handleGetClick}>get cookie</button> <br>
<button class="rounded-lg border-2" on:click={handleDeleteClick}>delete cookie</button> <br>

<p>{displayData}</p>