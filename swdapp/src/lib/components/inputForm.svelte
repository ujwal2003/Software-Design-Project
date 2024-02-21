<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    type TailwindString = string | "";
    interface LabelColorProperties {
        border: TailwindString,
        background: TailwindString,
        text: TailwindString
    };
    
    interface InputColorProperties {
        border: TailwindString,
        background: TailwindString,
        focusBorder: TailwindString,
        focusRing: TailwindString,
        text: TailwindString
    };

    interface FormDescriptionProperties {
        title: string,
        button: string,
        top: string,
        bottom: string
    };

    type FormColorProperties = Omit<LabelColorProperties, "text">;
    
    /**
     * basic settings: labels, number of inputs, descriptions & title
     */
    export let darkMode: boolean = false;
    export let labels: string[];
    export let numInputs: number;
    export let fromDescription: FormDescriptionProperties;

    
    interface InputValue {
        inputLabel: string,
        inputValue: string
    };

    let inputValues: string[] = [];

    // for getting the values from inputs
    const dispatch = createEventDispatcher();
    export let formInputValues: InputValue[] = [];

    function handleChange(e: any, index: number) {
        inputValues[index] = e.target.value;

        formInputValues[index] = {
            inputLabel: labels[index],
            inputValue: inputValues[index]
        };

        dispatch('inputChange', formInputValues);
    }

    // Default color settings
    export let labelColor: LabelColorProperties = {
        border: "border-gray-200",
        background: "bg-gray-50",
        text: "text-gray-500"
    };

    export let inputColor: InputColorProperties = {
        border: "border-gray-200",
        background: "bg-slate-100",
        focusBorder: "border-blue-500",
        focusRing: "ring-blue-500",
        text: ""
    }

    export let formColor: FormColorProperties = {
        border: "border-gray-200",
        background: "bg-[#FFFFFF]"
    }

    let darkModeLabel = "dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400";
    let darkModeInput = "dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600";

    let labelStyle = `
        px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 ${labelColor.border} ${labelColor.background} text-sm ${labelColor.text}
    `;

    let inputStyle = `
        py-2 px-3 pe-11 block w-full ${inputColor.border} shadow-sm rounded-e-lg text-sm focus:z-10 focus:${inputColor.focusBorder} focus:${inputColor.focusRing} disabled:opacity-50 disabled:pointer-events-none ${inputColor.text} ${inputColor.background}
    `;

    let formBorderStyle = `
        flex flex-col gap-2 border-solid ${formColor.border} border-spacing-1 p-4 rounded-lg ${formColor.background} shadow-sm rounded-e-lg
    `;

    if(darkMode) {
        labelStyle = `${labelStyle} ${darkModeLabel}`;
        inputStyle = `${inputStyle} ${darkModeInput}`;
    }
</script>

<div class={formBorderStyle}>
    <p class="font-medium text-2xl text-[#0F172A]">
        {fromDescription.title}
    </p>

    <p class="text-[#64748B] text-sm">
        {@html fromDescription.top}
    </p>

    {#each Array(numInputs) as _, index}
        <div class="flex rounded-lg shadow-sm">
            <span class={labelStyle}>
                {labels[index]}
            </span>
            <input type="text" class={inputStyle} bind:value={inputValues[index]} on:input={(event) => handleChange(event, index)}>
        </div>
    {/each}

    <div class="flex justify-end">
        <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" on:click={() => {
            dispatch('formSubmit')
        }}>
            {fromDescription.button}
        </button>
    </div>

    <p class="text-[#64748B] text-sm">
        {@html fromDescription.bottom}
    </p>
</div>