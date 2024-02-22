<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";

    import DescriptionList from "$lib/components/description-list/descriptionList.svelte";
    import DescListItem from "$lib/components/description-list/descListItem.svelte";

    import { dummyQuoteData } from "$lib";
</script>

<div class="flex flex-col h-screen">
    <nav>
		<Header />
	</nav>

    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-0 h-full">
        <!-- left sidebar -->
		<aside class="w-1/6 bg-[#282828] h-full flex justify-left pl-10 pt-6 text-lg">
			<nav class="flex flex-col gap-2">
				<a href="/" class="text-[#CBD5E1]"> Profile </a>
				<a href="/" class="text-[#CBD5E1]"> Quote History </a>
			</nav>
		</aside>

        <div class="w-5/6 bg-[#F0F5F8] flex flex-col flex-wrap">
			<p class="text-3xl pl-8 pt-4">Payment History</p>

			<div class="flex">
				<div class="w-1/3 pl-7 pt-4">
					test
				</div>

				<div class="w-2/3 ml-6 mr-6 mt-4">
					<DescriptionList>
                        <!-- <DescListItem slot="listItem0" details={{title: "title", text: "text 1"}} /> -->
                        <!-- <DescListItem slot="listItem" details={{title: "title 2", text: "text 2"}} /> -->
                    </DescriptionList>
				</div>
			</div>
		</div>
    </main>

    <footer>
        <Footer />
    </footer>
</div>