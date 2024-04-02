<script lang="ts">
  export let header: boolean = false;
</script>

{#if header}
  <thead>
      <tr>
        <slot></slot>
      </tr>
  </thead>
{:else}
  <tr class="hover:bg-gray-100">
    <slot></slot>
  </tr>
{/if}