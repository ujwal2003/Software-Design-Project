<script lang="ts">
    type Month = "-" | "Jan"| "Feb"| "Mar"| "Apr"| "May"| "Jun"| "Jul"| "Aug"| "Sep"| "Oct"| "Nov"| "Dec";

    let calMonth:Month =  "Feb";
    let calYear: number = 2024;

    const convertWeekDayName = {0: "Su", 1: "Mo", 2: "Tu", 3: "We", 4: "Th", 5: "Fr", 6: "Sa"};
	const convertWeekToCalNum = {"Mo": 0, "Tu": 1, "We": 2, "Th": 3, "Fr": 4, "Sa": 5, "Su": 6};
	const convertMonthNames = {"Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11};

	function getMonthDayDetails(monthName: string, year: number) {
		let month: number = (convertMonthNames as any)[monthName];
		let date = new Date(year, month, 1);

		let beginDay = date.getDay();
		let dayNum: number = 0;

		while(date.getMonth() === month) {
			dayNum = date.getDate();
			date.setDate(date.getDate() + 1);
		}

		return {startDay: (convertWeekDayName as any)[beginDay], numDays: dayNum};
	}

    let calDisplayDetails = getMonthDayDetails(calMonth, calYear);
    let calMonthStartIdx = (convertWeekToCalNum as any)[calDisplayDetails.startDay];
    let lastDay = calDisplayDetails.numDays;
    let counter = 1;

    let dateStyle = `
            m-px flex size-10 items-center justify-center rounded-full border border-transparent text-sm 
            text-gray-800 hover:border-blue-600 hover:text-blue-600 disabled:pointer-events-none disabled:text-gray-300
        `;
</script>

{#each {length: 6} as _, i}
    <div class="flex">
        {#each {length: 7} as __, j}
            {#if i == 0 && j == calMonthStartIdx}
                <button type="button" class={dateStyle}>1</button>
                <!-- {counter += 1} -->
            {:else if (counter + j + (i*7)) <= lastDay}
                <button type="button" class={dateStyle}>{counter + j + (i*7)}</button>
                <!-- {counter += 1} -->
            {:else}
                <button type="button" class={dateStyle}>-</button>
            {/if}
        {/each}
    </div>
{/each}