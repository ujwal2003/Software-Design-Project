<style>
    @import 'styles.css';
</style>

<script lang="ts">
    let firstName = '';
    let middleName = '';
    let lastName = '';

    function handleSubmit(e: any) {
        e.preventDefault(); 
        console.log("First Name:", firstName);
        console.log("Middle Name:", middleName);
        console.log("Last Name:", lastName);
    }
</script>

<div class="section">
    <div class="section-title">Full Name</div>
    <form on:submit={handleSubmit}>
        <div>
            <label for="first-name">First Name</label>
            <input type="text" id="first-name" bind:value={firstName} />
        </div>
        <div>
            <label for="middle-name">Middle Name</label>
            <input type="text" id="middle-name" bind:value={middleName} />
        </div>
        <div>
            <label for="last-name">Last Name</label>
            <input type="text" id="last-name" bind:value={lastName} />
        </div>
        <button type="submit" class="submit-button">Submit</button>
    </form>
</div>
