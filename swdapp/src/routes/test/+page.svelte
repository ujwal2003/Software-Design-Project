<script lang="ts">
	import PrelineTable from "$lib/components/preline-table/prelineTable.svelte";
	import TableData from "$lib/components/preline-table/tableData.svelte";
	import TableRow from "$lib/components/preline-table/tableRow.svelte";
	import TableSection from "$lib/components/preline-table/tableSection.svelte";
	import ScrollContainer from "$lib/components/scrollContainer.svelte";
</script>

<main class="flex justify-center items-center h-screen">
	<ScrollContainer tailwindAppend='overflow-x-hidden' heightOffset={40} noFlex>
		<PrelineTable>
			<TableSection style='head'>
				<TableData header>col 1</TableData>
				<TableData header>col 2</TableData>
				<TableData header>col 3</TableData>
				<TableData header>col 4</TableData>
			</TableSection>
			
			<TableSection style='body'>
					{#each Array(15) as _, i}
						<TableRow>
							<TableData>{String.fromCharCode('a'.charCodeAt(0)+i)}1</TableData>
							<TableData>{String.fromCharCode('a'.charCodeAt(0)+i)}2</TableData>
							<TableData>{String.fromCharCode('a'.charCodeAt(0)+i)}3</TableData>
							<TableData button>click here</TableData>
						</TableRow>
					{/each}
			</TableSection>
		</PrelineTable>
	</ScrollContainer>
</main>