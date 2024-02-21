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

    function handleFormSubmit(e: any) {
        console.log("Form Clicked!");
    }
</script>

<div class="flex flex-col h-screen">
    <nav>
        <Header />
    </nav>

    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap items-center justify-center mt-14 h-full bg-[#F0F5F8]">

        <InputForm 
            numInputs={3} 
            labels={["label1 ", "label2", "third  "]} 
            fromDescription={{title: "Title", button: "Button", top: "Top Description", bottom: "Bottom Description"}}
            bind:formInputValues={inputVals} 
            on:inputChange={handleInputChange} 
            on:formSubmit={handleFormSubmit}
        />

    </main>

    <footer>
        <Footer />
    </footer>
</div>