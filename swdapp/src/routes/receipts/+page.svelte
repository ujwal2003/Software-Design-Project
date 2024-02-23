<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	import DescriptionList from '$lib/components/description-list/descriptionList.svelte';
	import DescListItem from '$lib/components/description-list/descListItem.svelte';
	import DescListButton from '$lib/components/description-list/descListButton.svelte';

	import { dummyQuoteData } from '$lib';

	function handleClick() {
		console.log('click!');
	}
</script>

<div class="flex h-screen flex-col">
	<nav>
		<Header />
	</nav>

	<main class="mt-0 flex h-full max-w-full flex-wrap overflow-hidden overflow-x-hidden">
		<!-- left sidebar -->
		<aside class="justify-left flex h-full w-1/6 bg-[#282828] pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/" class="text-[#CBD5E1]"> Profile </a>
				<a href="/" class="text-[#CBD5E1]"> Quote History </a>
			</nav>
		</aside>

		<div class="flex w-5/6 flex-col flex-wrap bg-[#F0F5F8]">
			<p class="pl-8 pt-4 text-3xl">Payment History</p>

			<div class="flex">
				<div class="w-1/3 pl-7 pt-4">test</div>

				<div class="ml-6 mr-6 mt-4 w-2/3">
					<DescriptionList>
						<DescListItem details={{ title: 'title', text: 'text 1' }} />
						<DescListItem details={{ title: 'title 2', text: 'text 2' }} />
						<DescListItem details={{ title: 'title 3', text: 'text 3' }} />
						<div>
							<DescListButton
								btnLabel={'button'}
								btnEvent={'coolEvent'}
								on:coolEvent={handleClick}
							/>
						</div>
					</DescriptionList>
				</div>
			</div>
		</div>
	</main>

	<footer>
		<Footer />
	</footer>
</div>
