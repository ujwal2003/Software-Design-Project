<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import Selector from "../selector.svelte";
    
    const dispatch = createEventDispatcher();
    const currDate = new Date();

    type Month = "-" | "Jan"| "Feb"| "Mar"| "Apr"| "May"| "Jun"| "Jul"| "Aug"| "Sep"| "Oct"| "Nov"| "Dec" | "selection";
    type Year = "-" | number | "selection";

    let months: Month[] = ["-", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let years: Year[] = ["-", currDate.getFullYear(), currDate.getFullYear()+1, currDate.getFullYear()+2];

    export let selectedMonth: Month = "selection";
    export let selectedYear: Year = "selection";
</script>

<!-- Months -->
<div class="grid grid-cols-5 items-center pb-3">
    <!-- Prev Button -->
    <div class="col-span-1">
        <!-- <button
            type="button"
            class="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        >
            <svg
                class="size-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
            >
        </button> -->
    </div>
    <!-- End Prev Button -->

    <!-- Month / Year -->
    <div class="col-span-3 ml-[-0.8rem] flex w-52 items-center justify-center gap-1">
        <Selector label={'Month'} on:selection={(e) => {selectedMonth = e.detail.selectedVal; dispatch('dateSelection')}}>
            {#each months as month}
                <option value={month}>{month}</option>
            {/each}
        </Selector>

        <span class="text-gray-800">/</span>

        <Selector label={'Year'} on:selection={(e) => {selectedYear = e.detail.selectedVal; dispatch('dateSelection')}}>
            {#each years as year}
                <option value={year}>{year}</option>
            {/each}
        </Selector>
    </div>
    <!-- End Month / Year -->

    <!-- Next Button -->
    <div class="col-span-1 flex justify-end">
        <!-- <button
            type="button"
            class="flex size-8 items-center justify-center rounded-full text-gray-800 hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50"
        >
            <svg
                class="size-4 flex-shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
            >
        </button> -->
    </div>
    <!-- End Next Button -->
</div>
<!-- Months -->