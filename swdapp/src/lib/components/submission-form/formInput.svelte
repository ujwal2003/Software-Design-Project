<script lang="ts">
    type InputType = "text" | "password";
    export let inputType: InputType;
    export let placeholderText: string;

    export let labeled = false;
    let inputStyle = `
            py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm ${labeled ? 'rounded-e-lg' : 'rounded-lg'} text-sm focus:z-10 
            focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 
            disabled:pointer-events-none bg-slate-100
        `;
</script>

<div class="flex rounded-lg shadow-sm">
    <slot></slot>
    {#if inputType === 'text'}
        <input 
            type="text"
            class={inputStyle}
            placeholder={placeholderText}
        />
    {/if}
</div>