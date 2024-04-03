<script lang="ts">
  export let header: boolean = false;
</script>

{#if header}
    <tr>
      <slot></slot>
    </tr>
{:else}
  <tr class="bg-slate-50 hover:bg-gray-100">
    <slot></slot>
  </tr>
{/if}