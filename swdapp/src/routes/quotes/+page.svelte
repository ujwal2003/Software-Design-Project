<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import QuoteCards from "$lib/components/quoteCards.svelte";

    interface QuoteCard {
        id: string,
        date: string,
        time: string,
        gallons: number,
        price: number
    };

    // dummy data, get actual from database
    let quotes: QuoteCard[] = [
        { id: "1", date: "2/21/2024", time: "1:59pm", gallons: 5, price: 200.55 },
        { id: "2", date: "2/20/2024", time: "11:35am", gallons: 3, price: 150.45 },
        { id: "3", date: "2/18/2024", time: "4:30pm", gallons: 10, price: 550.10 },
        { id: "4", date: "2/17/2024", time: "9:301am", gallons: 9, price: 250.10 },
    ];

    function getQuoteDetailsFromCard(e: any) {
        console.log(e.detail);
    }
</script>

<div class="flex flex-col h-screen">
    <nav>
        <Header />
    </nav>

    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-14 h-full">
        <!-- left sidebar -->
        <aside class="w-1/6 bg-[#282828] h-full flex justify-left pl-10 pt-6 text-lg">
            <nav class="flex flex-col gap-2">
                <a href="/" class="text-[#CBD5E1]"> 
                    Profile 
                </a>
    
                <a href="/" class="text-[#CBD5E1]"> 
                    Payment History 
                </a>
            </nav>
        </aside>

        <!-- main content -->
        <div class="w-5/6 bg-[#F0F5F8] flex flex-col flex-wrap">
            <p class="text-3xl pl-8 pt-4">
                Fuel Quote History
            </p>

            <div>
                
                <div class="w-1/3 pl-7 pt-4">
                    <QuoteCards quoteCards={quotes} on:cardDetailClick={(e) => getQuoteDetailsFromCard(e)} />
                </div>

                <!-- TODO: Quote Detail -->
            </div>
        </div>
    </main>

    <footer>
        <Footer />
    </footer>
</div>