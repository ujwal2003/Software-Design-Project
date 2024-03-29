<script lang="ts">
    export let title = false;
    export let description = false;
    export let formLabel = false;
</script>

<p class="text-2xl font-medium text-[#0F172A]">
    {#if title}
        <p class="text-2xl font-medium text-[#0F172A]">
            <slot></slot>
        </p>
    {:else if description}
        <p class="text-sm font-normal text-[#64748B]">
            <slot></slot>
        </p>
    {:else if formLabel}
        <span class="px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 border-gray-200 bg-gray-50 text-sm text-gray-500">
            <slot></slot>
        </span>
    {:else}
        <slot></slot>
    {/if}
</p>