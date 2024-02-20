<script lang="ts">
    
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
    
    export let darkMode: boolean = false;
    
    export let labelColor: LabelColorProperties = {
        border: "border-gray-200",
        background: "bg-gray-50",
        text: "text-gray-500"
    };

    export let inputColor: InputColorProperties = {
        border: "border-gray-200",
        background: "",
        focusBorder: "border-blue-500",
        focusRing: "ring-blue-500",
        text: ""
    }

    let darkModeLabel = "dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400";
    let darkModeInput = "dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600";

    let labelStyle = `
        px-4 inline-flex items-center min-w-fit rounded-s-md border border-e-0 ${labelColor.border} ${labelColor.background} text-sm ${labelColor.text}
    `;

    let inputStyle = `
        py-2 px-3 pe-11 block w-full ${inputColor.border} shadow-sm rounded-e-lg text-sm focus:z-10 focus:${inputColor.focusBorder} focus:${inputColor.focusRing} disabled:opacity-50 disabled:pointer-events-none ${inputColor.text}
    `;

    if(darkMode) {
        labelStyle = `${labelStyle} ${darkModeLabel}`;
        inputStyle = `${inputStyle} ${darkModeInput}`;
    }
</script>

<div>
    <div class="flex rounded-lg shadow-sm">
        <span class={labelStyle}>
            Small
        </span>
        <input type="text" class={inputStyle}>
    </div>
</div>