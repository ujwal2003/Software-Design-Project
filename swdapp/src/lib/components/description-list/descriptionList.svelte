<script lang="ts">
</script>

<div class="rounded-xl bg-[#E9F0F6] p-4 shadow-md md:p-5">
	<dl class="mb-3 grid gap-1 sm:grid-cols-3 sm:gap-3">
		<slot />
	</dl>

	<!-- button slot -->
	<slot name="button" />
</div>
