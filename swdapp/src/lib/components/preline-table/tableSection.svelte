<script lang="ts">
    type StyleType = 'head' | 'body';
    export let style: StyleType;

    type TailwindString = string;
    export let headBg: TailwindString = 'bg-gray-50';
</script>

{#if style === 'head'}
    <thead class={headBg}>
        <slot></slot>
    </thead>
{:else}
    <tbody class="divide-y divide-gray-200">
        <slot></slot>
    </tbody>
{/if}