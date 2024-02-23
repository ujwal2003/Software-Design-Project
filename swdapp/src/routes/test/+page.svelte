<script lang="ts">
    import DatePicker from "$lib/components/date-picker/datePicker.svelte";
    import DatePickerHeader from "$lib/components/date-picker/datePickerHeader.svelte";
    import DatePickerDays from "$lib/components/date-picker/datePickerDays.svelte";

    import DummyDatePickerDays from "$lib/components/date-picker/dummyDatePickerDays.svelte";

    let mo: any = "-";
    let yr: any = "-";
    function handleDateSelection() {
        console.log(mo, yr);
    }
</script>

<div class="flex flex-col items-center">
    <DatePicker> 
        <DatePickerHeader slot="header" bind:selectedMonth={mo} bind:selectedYear={yr} on:dateSelection={handleDateSelection} />
        <!-- <DummyDatePickerDays /> -->
        <DatePickerDays />
    </DatePicker>
</div>