<script>
    import { toast } from '@zerodevx/svelte-toast'
    import Dummy from '$lib/components/dummy.svelte';
</script>
  
<!-- <button on:click={() => toast.push('Hello world!')}>SHOW TOAST</button> -->
<button on:click={() => toast.push({
    component: {
        src: Dummy,
        props: {
            v: 'prop'
        }
    },
    theme: {
    '--toastBackground': 'none',
    '--toastColor': 'black',
  },
  dismissable: true,
})}>SHOW TOAST</button>