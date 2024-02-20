<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
</script>

<div class="flex flex-col h-screen">
    <nav>
        <Header />
    </nav>

    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-14 h-full">
        <!-- left side -->
        <section class="w-1/2 bg-[#282828] h-full">
            <quote class="text-white flex flex-col gap-4">
                <p class="text-center text-wrap text-3xl font-bold italic">
                    &ldquo;My car started to fly after using FuelFinder&rdquo;
                </p>
                <p class="text-xl flex flex-row-reverse pr-16">
                    - Generic Car Owner
                </p>
            </quote>
        </section>

        <!-- right side -->
        <section class="w-1/2 bg-[#F0F5F8]">
            test
        </section>
    </main>

    <footer>
        <Footer />
    </footer>
</div>