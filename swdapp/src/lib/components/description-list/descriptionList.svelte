<script lang="ts">
    export let numDetails = 1;
</script>

<div class="bg-[#E9F0F6] shadow-md rounded-xl p-4 md:p-5">
    <dl class="grid sm:grid-cols-3 gap-1 sm:gap-3 mb-3">
        <!-- title & description slots -->
        {#each {length: numDetails} as _, i}
            <slot name={`listItem${i}`}></slot>
        {/each}
    </dl>

    <!-- button slot -->
    <slot name="button"></slot>
</div>