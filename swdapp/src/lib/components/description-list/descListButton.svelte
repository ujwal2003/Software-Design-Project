<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let btnLabel:string;
    export let btnEvent:string;
</script>

<button
		type="button"
		class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-gray-800 px-4 py-3 text-sm font-semibold text-white hover:bg-gray-900 disabled:pointer-events-none disabled:opacity-50 w-1/2"
		on:click={() => {
			dispatch(btnEvent);
		}}
	>
		{btnLabel}
	</button>