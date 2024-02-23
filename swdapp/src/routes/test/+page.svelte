<script lang="ts">
    import DatePicker from "$lib/components/datePicker.svelte";
    import Selector from "$lib/components/selector.svelte";
</script>

<div class="flex flex-col items-center">
    <Selector label={"label"}>
        <option>Option 1</option>
        <option>Option 2</option>
        <option>Option 3</option>
    </Selector>
    <DatePicker />
</div>