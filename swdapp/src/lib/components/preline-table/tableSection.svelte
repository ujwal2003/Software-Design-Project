<script lang="ts">
    type StyleType = 'head' | 'body';
    export let style: StyleType;
</script>

{#if style === 'head'}
    <thead>
        <slot></slot>
    </thead>
{:else}
    <tbody class="divide-y divide-gray-200">
        <slot></slot>
    </tbody>
{/if}