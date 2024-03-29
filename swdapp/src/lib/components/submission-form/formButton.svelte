<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    type JustifySetting = "begin" | "center" | "end";
    export let justify: JustifySetting = "begin";

    let justifyDir: string = '';
    justifyDir = (justify == 'begin') ? '' : (justify == 'center') ? 'justify-center' : 'justify-end';
</script>

<div class={`flex ${justifyDir}`}>
    <button
        type="button"
        class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:bg-slate-900 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
        on:click={() => {dispatch("formClick")}}
    >
        <slot></slot>
    </button>
</div>