<style>
    @import 'styles.css';
</style>

<script lang="ts">
    let address1 = '';
    let address2 = '';

    function handleSubmit(e: any) {
        e.preventDefault(); 
        console.log("Address 1:", address1);
        console.log("Address 2:", address2);
    }
</script>

<div class="section">
    <div class="section-title">Address</div>
    <form on:submit={handleSubmit}>
        <div>
            <label for="address-1">Address 1</label>
            <input type="text" id="address-1" bind:value={address1} />
        </div>
        <div>
            <label for="address-2">Address 2</label>
            <input type="text" id="address-2" bind:value={address2} />
        </div>
        <button type="submit" class="submit-button">Submit</button>
    </form>
</div>
