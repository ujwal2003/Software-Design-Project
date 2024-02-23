<script lang="ts">
	interface DetailItem {
		title: string;
		text: string | number;
	}

	export let details: DetailItem;
</script>

<dt class="font-semibold sm:col-span-1">{details.title}</dt>
<dd class="mb-3 text-[#64748B] sm:col-span-2 sm:mb-0">{details.text}</dd>
