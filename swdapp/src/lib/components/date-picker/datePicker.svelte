<script lang="ts">
	let weekDays: string[] = ["Mo", "Tu", "We", "Th", "Fr","Sa", "Su"];
</script>

<!-- Datepicker -->
<div class="flex w-80 flex-col overflow-hidden rounded-xl border bg-white shadow-lg">
	<!-- Calendar -->
	<div class="p-3">
    
		<slot name="header"></slot>

		<div class="space-y-0.5">
			<!-- Weeks -->
			<div class="flex pb-1.5">
				{#each weekDays as weekDay}
					<span class="m-px block w-10 text-center text-sm text-gray-500"> {weekDay} </span>
				{/each}
			</div>
			<!-- Weeks -->

			<!-- Days -->
			<slot></slot>
			<!-- Days -->
			
		</div>
		<!-- End Calendar -->
	</div>

	<!-- Footer -->
	<!-- <div class="flex items-center justify-end gap-x-2 border-t p-3">
		<button
			type="button"
			class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
		>
			Cancel
		</button>
		<button
			type="button"
			class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
		>
			Apply
		</button>
	</div> -->
	<!-- End Footer -->
</div>
<!-- End Datepicker -->
