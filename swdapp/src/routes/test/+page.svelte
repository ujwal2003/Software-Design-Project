<script lang="ts">
	import PrelineTable from "$lib/components/preline-table/prelineTable.svelte";
	import TableData from "$lib/components/preline-table/tableData.svelte";
	import TableRow from "$lib/components/preline-table/tableRow.svelte";
	import TableSection from "$lib/components/preline-table/tableSection.svelte";
</script>

<main class="flex justify-center items-center h-screen">
	<PrelineTable>
		<TableSection style='head'>
			<TableData header>col 1</TableData>
			<TableData header>col 2</TableData>
			<TableData header>col 3</TableData>
			<TableData header>col 4</TableData>
		</TableSection>

		<TableSection style='body'>
			<TableRow>
				<TableData>val 11</TableData>
				<TableData>val 12</TableData>
				<TableData>val 13</TableData>
				<TableData button>button 14</TableData>
			</TableRow>

			<TableRow>
				<TableData>val 21</TableData>
				<TableData>val 22</TableData>
				<TableData>val 23</TableData>
				<TableData button>button 24</TableData>
			</TableRow>
		</TableSection>
	</PrelineTable>
</main>