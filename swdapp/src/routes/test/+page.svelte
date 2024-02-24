<script lang="ts">
    import DatePicker from "$lib/components/date-picker/datePicker.svelte";
    import DatePickerHeader from "$lib/components/date-picker/datePickerHeader.svelte";
    import DatePickerDays from "$lib/components/date-picker/datePickerDays.svelte";

    let chosenMonth: any = "-";
    let chosenYear: any = "-";

    $: selectionUpdateStr = chosenMonth + chosenYear;

    function handleDateSelection() {
        console.log(chosenMonth, chosenYear);
    }

    function handleDateClick(e: CustomEvent<any>) {
        console.log(e.detail);
    }
</script>

<div class="flex flex-col items-center mt-14">
    <DatePicker> 
        <DatePickerHeader slot="header" bind:selectedMonth={chosenMonth} bind:selectedYear={chosenYear} on:dateSelection={handleDateSelection} />
        {#key selectionUpdateStr}
            <DatePickerDays calMonth={chosenMonth} calYear={chosenYear} on:dateClick={handleDateClick} />
        {/key}
    </DatePicker>
</div>
