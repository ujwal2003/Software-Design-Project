<script lang="ts">
	import { stringify } from 'postcss';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let btnColor = 'bg-gray-800';
	export let btnColorHoever = 'hover:bg-gray-900';
	export let dataOverlay = '';
	export let btnLabel: string;
	export let btnEvent: string;
</script>

<button
	type="button"
	class="inline-flex shrink-0 items-center gap-x-2 rounded-lg border border-transparent {btnColor} px-4 py-3 text-sm font-semibold text-white {btnColorHoever} disabled:pointer-events-none disabled:opacity-50"
	data-hs-overlay={dataOverlay}
	on:click={() => {
		dispatch(btnEvent);
	}}
>
	{btnLabel}
</button>
