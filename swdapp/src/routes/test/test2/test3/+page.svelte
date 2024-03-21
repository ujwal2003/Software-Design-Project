<script>
    import { onMount } from 'svelte';
  
    onMount(() => {
      // Set the cookie expiration to a past date to delete it
      document.cookie = 'user_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    });
</script>

<p>cookie deleted (hopefully)</p>