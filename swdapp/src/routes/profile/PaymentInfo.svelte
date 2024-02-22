<script lang="ts">
    let cardName = '';
    let cardNumber = '';
    let expiration = '';
    let cvv = '';

    function handleSubmit(e: any) {
        e.preventDefault();

        console.log("Card Name:", cardName);
        console.log("Card Number:", cardNumber);
        console.log("Expiration:", expiration);
        console.log("CVV:", cvv);
    }
</script>

<style>
    @import 'styles.css';
</style>

<div class="section">
    <div class="section-title">Payment Information</div>
    <form on:submit={handleSubmit}>
        <div>
            <label for="card-name">Card Name</label>
            <input type="text" id="card-name" bind:value={cardName} />
        </div>
        <div>
            <label for="card-number">Card Number</label>
            <input type="text" id="card-number" bind:value={cardNumber} />
        </div>
        <div>
            <label for="expiration">Expiration</label>
            <input type="text" id="expiration" bind:value={expiration} />
        </div>
        <div>
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" bind:value={cvv} />
        </div>
        <button type="submit" class="submit-button">Submit</button>
    </form>
</div>
