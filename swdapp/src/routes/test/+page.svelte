<script lang="ts">
	import PrelineTable from "$lib/components/preline-table/prelineTable.svelte";
	import TableData from "$lib/components/preline-table/tableData.svelte";
	import TableRow from "$lib/components/preline-table/tableRow.svelte";
</script>

<main class="flex justify-center mt-14">
	<PrelineTable>
		<TableRow>
			<TableData header>col 1</TableData>
			<TableData header>col 2</TableData>
			<TableData header>col 3</TableData>
			<TableData header>col 4</TableData>
		</TableRow>
	</PrelineTable>
</main>