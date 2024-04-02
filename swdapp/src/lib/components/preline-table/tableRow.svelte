<script lang="ts">
  export let header: boolean = false;
</script>

{#if header}
    <tr>
      <slot></slot>
    </tr>
{:else}
  <tr class="hover:bg-gray-100">
    <slot></slot>
  </tr>
{/if}