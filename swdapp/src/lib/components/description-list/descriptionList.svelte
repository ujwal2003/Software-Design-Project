<script lang="ts">
    // export let numDetails = 1;
    // interface DetailItem {
    //     title: string;
    //     text: string;
    // }

    // export let items: { slotName: string, content: DetailItem }[] = [];

</script>

<div class="bg-[#E9F0F6] shadow-md rounded-xl p-4 md:p-5">
    <dl class="grid sm:grid-cols-3 gap-1 sm:gap-3 mb-3">
        <slot></slot>
    </dl>

    <!-- button slot -->
    <slot name="button"></slot>
</div>