<script lang="ts">
    interface DetailItem {
        title: string,
        text: string
    };

    export let details: DetailItem;
</script>

<dt class="sm:col-span-1 font-semibold"> {details.title} </dt>
<dd class="sm:col-span-2 mb-3 sm:mb-0 text-[#64748B]"> {details.text} </dd>