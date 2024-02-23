<script lang="ts">
	let weekDays: string[] = ["Mo", "Tu", "We", "Th", "Fr","Sa", "Su"];

	// const CAL_ROWS = 6;
	// const CALC_COLS = 7;
	// interface CalendarDay {placeholder: boolean, value?: string};
	// let calDays:CalendarDay[][] =[];

	// let calInfo = getMonthDayDetails("Jan", 2024);
	// let startCalDayIdx = (convertWeekToCalNum as any)[calInfo.startDay];
	// let sopCalDay = calInfo.numDays;

	// for(let i = 0; i < CAL_ROWS; i++) {
	// 	let calRowDays:CalendarDay[] = Array(7).fill({placeholder: true});
	// }
</script>

<!-- Datepicker -->
<div class="flex w-80 flex-col overflow-hidden rounded-xl border bg-white shadow-lg">
	<!-- Calendar -->
	<div class="p-3">
    
		<slot name="header"></slot>

		<div class="space-y-0.5">
			<!-- Weeks -->
			<div class="flex pb-1.5">
				{#each weekDays as weekDay}
					<span class="m-px block w-10 text-center text-sm text-gray-500"> {weekDay} </span>
				{/each}
			</div>
			<!-- Weeks -->

			<!-- Days -->
			<slot></slot>
			<!-- Days -->
			
		</div>
		<!-- End Calendar -->

		<!-- Time -->
		<div class="mt-3 flex items-center justify-center gap-x-2">
			<!-- Select -->
			<!-- <div class="relative">
          <select data-hs-select={hourSelectionStyles} class="hidden">
            <option value=""></option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option selected>12</option>
          </select>
  
          <div class="absolute top-1/2 end-2 -translate-y-1/2">
            <svg class="flex-shrink-0 size-3 text-gray-500 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
          </div>
        </div> -->
			<!-- End Select -->

			<!-- <span class="text-gray-800 dark:text-white">:</span> -->

			<!-- Select -->
			<!-- <div class="relative">
          <select data-hs-select={minuteSelectionStyles} class="hidden">
            <option value=""></option>
            <option selected>00</option>
            <option>01</option>
            <option>02</option>
            <option>03</option>
            <option>04</option>
            <option>05</option>
            <option>06</option>
            <option>07</option>
            <option>08</option>
            <option>09</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
            <option>31</option>
            <option>32</option>
            <option>33</option>
            <option>34</option>
            <option>35</option>
            <option>36</option>
            <option>37</option>
            <option>38</option>
            <option>39</option>
            <option>40</option>
            <option>41</option>
            <option>42</option>
            <option>43</option>
            <option>44</option>
            <option>45</option>
            <option>46</option>
            <option>47</option>
            <option>48</option>
            <option>49</option>
            <option>50</option>
            <option>51</option>
            <option>52</option>
            <option>53</option>
            <option>54</option>
            <option>55</option>
            <option>56</option>
            <option>57</option>
            <option>58</option>
            <option>59</option>
          </select>
  
          <div class="absolute top-1/2 end-2 -translate-y-1/2">
            <svg class="flex-shrink-0 size-3 text-gray-500 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
          </div>
        </div> -->
			<!-- End Select -->

			<!-- Select -->
			<!-- <div class="relative">
          <select data-hs-select={amPmSelectionStyles} class="hidden">
            <option value=""></option>
            <option selected>PM</option>
            <option>AM</option>
          </select>
  
          <div class="absolute top-1/2 end-2 -translate-y-1/2">
            <svg class="flex-shrink-0 size-3 text-gray-500 dark:text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
          </div>
        </div> -->
			<!-- End Select -->
		</div>
		<!-- End Time -->
	</div>

	<!-- Footer -->
	<div class="flex items-center justify-end gap-x-2 border-t p-3">
		<button
			type="button"
			class="inline-flex items-center gap-x-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
		>
			Cancel
		</button>
		<button
			type="button"
			class="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:pointer-events-none disabled:opacity-50"
		>
			Apply
		</button>
	</div>
	<!-- End Footer -->
</div>
<!-- End Datepicker -->
