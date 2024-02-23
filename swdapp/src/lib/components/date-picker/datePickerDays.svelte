<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    type Month = "-" | "Jan"| "Feb"| "Mar"| "Apr"| "May"| "Jun"| "Jul"| "Aug"| "Sep"| "Oct"| "Nov"| "Dec";
    const OVERFLOW = 100;

    export let calMonth:Month;
    export let calYear:string|number;

    const convertWeekDayName = {0: "Su", 1: "Mo", 2: "Tu", 3: "We", 4: "Th", 5: "Fr", 6: "Sa"};
	const convertWeekToCalNum = {"Mo": 0, "Tu": 1, "We": 2, "Th": 3, "Fr": 4, "Sa": 5, "Su": 6, "-": OVERFLOW};
	const convertMonthNames = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11};

	function getMonthDayDetails(monthName: string, year: string) {
        if(monthName == '-' || year == '-') {
            return {startDay: "-", numDays: -1};
        }

		let month: number = (convertMonthNames as any)[monthName];
		let date = new Date(Number(year), month, 1);

		let beginDay = date.getDay();
		let dayNum: number = 0;

		while(date.getMonth() === month) {
			dayNum = date.getDate();
			date.setDate(date.getDate() + 1);
		}

		return {startDay: (convertWeekDayName as any)[beginDay], numDays: dayNum};
	}

    let calDisplayDetails = getMonthDayDetails(calMonth, calYear.toString());
    let calMonthStartIdx = (convertWeekToCalNum as any)[calDisplayDetails.startDay];
    let lastDay = calDisplayDetails.numDays;

    let calFirstRow = Array(7).fill('');
    for(let i = calMonthStartIdx; i < calFirstRow.length; i++) {
        calFirstRow[i] = i - calMonthStartIdx + 1;
    }

    let lastDayFirstRowOffset: number;
    if(calFirstRow[calFirstRow.length - 1] != '')
        lastDayFirstRowOffset = 8 - (calFirstRow[calFirstRow.length - 1]) - 1;
    else
        lastDayFirstRowOffset = -1;

    let dateStyle = `
            m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm 
            text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:text-gray-300
        `;

    let prevClicked: any = null;
    let currClicked: any = null;

    function handleDayClick(e: any, clickedDate: any) {
        prevClicked = currClicked;
        currClicked = e.target;

        if(prevClicked != null) {
            if(prevClicked == currClicked && currClicked.classList.contains("bg-blue-600")) {
                currClicked.classList.add("bg-blue-600");
                currClicked.classList.add("font-medium");
                currClicked.classList.add("text-white");
                currClicked.classList.remove("hover:text-blue-600");
            }

            currClicked.classList.add("bg-blue-600");
            currClicked.classList.add("font-medium");
            currClicked.classList.add("text-white");
            currClicked.classList.remove("hover:text-blue-600");

            prevClicked.classList.remove("bg-blue-600");
            prevClicked.classList.remove("font-medium");
            prevClicked.classList.remove("text-white");
            prevClicked.classList.add("hover:text-blue-600");
        } else {
            currClicked.classList.add("bg-blue-600");
            currClicked.classList.add("font-medium");
            currClicked.classList.add("text-white");
            currClicked.classList.remove("hover:text-blue-600");
        }

        dispatch('dateClick', {
            dateToggle: `${calMonth}_${currClicked.textContent}_${calYear}`
        });
    }
</script>

{#each {length: 6} as _, i}
    <div class="flex">
        {#each {length: 7} as __, j}
            {#if lastDayFirstRowOffset == -1}
                <button type="button" class={dateStyle} disabled>
                    -
                </button>
            {:else if i == 0}
                {#if calFirstRow[j] == ''}
                    <button type="button" class={dateStyle} disabled>
                        {calFirstRow[j]}
                    </button>
                {:else}
                    <button type="button" class={dateStyle} on:click={(e) => handleDayClick(e, calFirstRow[j])}>
                        {calFirstRow[j]}
                    </button>
                {/if}
            {:else if i > 0 && ((1 + j + (i*7)) - lastDayFirstRowOffset) <= lastDay}
                <button type="button" class={dateStyle} on:click={(e) => handleDayClick(e, (1 + j + (i*7) - lastDayFirstRowOffset))}>
                    {(1 + j + (i*7) - lastDayFirstRowOffset)}
                </button>
            {/if}
        {/each}
    </div>
{/each} 