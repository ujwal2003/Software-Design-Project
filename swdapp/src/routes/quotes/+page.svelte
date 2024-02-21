<script>
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
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
            <p class="text-4xl pl-8 pt-4">
                Fuel Quote History
            </p>

            <div>
                <!-- TODO: Quote Cards -->
                <!-- TODO: Quote Detail -->
            </div>
        </div>
    </main>

    <footer>
        <Footer />
    </footer>
</div>