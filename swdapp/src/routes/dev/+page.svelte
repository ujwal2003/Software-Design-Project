<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import InputForm from "$lib/components/inputForm.svelte";

    interface InputValue {
        inputLabel: string,
        inputValue: string
    };

    let inputVals: InputValue[] = [];
    function handleInputChange(e: any) {
        inputVals = e.detail;
    }
</script>

<div class="flex flex-col h-screen">
    <nav>
        <Header />
    </nav>

    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap items-center justify-center mt-14 h-full bg-[#F0F5F8]">
        <InputForm numInputs={2} labels={["label1", "label2"]} bind:formInputValues={inputVals} on:inputChange={handleInputChange} />
    </main>

    <footer>
        <Footer />
    </footer>
</div>