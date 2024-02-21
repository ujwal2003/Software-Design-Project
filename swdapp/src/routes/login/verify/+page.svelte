<script lang="ts">
    import Header from "$lib/components/header.svelte";
    import Footer from "$lib/components/footer.svelte";
    import InputForm from "$lib/components/inputForm.svelte";

    const loginTopDescription = "Once you login, you can create new quotes, and set your quote search settings!";
    const loginBottomDescription = "";

    interface InputValue {
        inputLabel: string,
        inputValue: string
    };

    let loginVals: InputValue[] = [];
    function handleLoginInputChange(e: any) {
        loginVals = e.detail;
    }

    function handleLoginSubmit() {
        console.log("Login Submission Clicked!");
    }
</script>

<div class="flex flex-col h-screen">
    <nav>
        <Header />
    </nav>

    <main class="overflow-hidden max-w-full overflow-x-hidden flex flex-wrap mt-14 h-full">
        <!-- left side -->
        <section class="w-1/2 bg-[#282828] h-full flex items-center justify-center">
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
        <section class="w-1/2 bg-[#F0F5F8] flex flex-wrap items-center justify-center">
            <div class="w-1/2">
                <InputForm 
                    numInputs={2}
                    labels={["Username or Email", "Password"]}
                    inputTypes={["text", "password"]}
                    fromDescription={{title: "Log In to Verify Your Brand New Account", button: "Login", top: loginTopDescription, bottom: loginBottomDescription}}
                    bind:formInputValues={loginVals}
                    on:inputChange={handleLoginInputChange}
                    on:formSubmit={handleLoginSubmit}
                />
            </div>
        </section>
    </main>

    <footer>
        <Footer />
    </footer>
</div>