<script lang="ts">
    export let header: boolean = false;
    export let button: boolean = false;
</script>

{#if header}
    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">
        <slot></slot>
    </th>
{:else if button}
    <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
        <button type="button" class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
            <slot></slot>
        </button>
    </td>
{:else}
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
        <slot></slot>
    </td>
{/if}