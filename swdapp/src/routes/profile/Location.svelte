<style>
    @import 'styles.css';
</style>

<script lang="ts">
    let city = '';
    let state = '';
    let zipcode = '';

    function handleSubmit(e: any) {
        e.preventDefault(); 
        console.log("City:", city);
        console.log("State:", state);
        console.log("Zipcode:", zipcode);
    }
</script>

<div class="section">
    <div class="section-title">Location</div>
    <form on:submit={handleSubmit}>
        <div>
            <label for="city">City</label>
            <input type="text" id="city" bind:value={city} />
        </div>
        <div>
            <label for="state">State</label>
            <input type="text" id="state" bind:value={state} />
        </div>
        <div>
            <label for="zipcode">Zipcode</label>
            <input type="text" id="zipcode" bind:value={zipcode} />
        </div>
        <button class="submit-button" type="submit">Submit</button>
    </form>
</div>
