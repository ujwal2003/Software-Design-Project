<script lang="ts">
    type Icon = 'warn' | 'error' | 'info' | 'success' | '';
    export let icon: Icon = '';
    export let definedColor: Icon = '';

    export let statusColor = '';

    if(icon == 'warn' && !definedColor) {
        statusColor = 'text-yellow-800';
    } else if(icon == 'error' && !definedColor) {
        statusColor = 'text-red-800';
    } else if(icon == 'success' && !definedColor) {
        statusColor = 'text-teal-800';
    } else if(icon =='info' && !definedColor) {
        statusColor = 'text-blue-600';
    } else if(!icon && !definedColor) statusColor = '';

    if(definedColor == 'warn') statusColor = 'text-yellow-800';
    else if(definedColor == 'error') statusColor = 'text-red-800';
    else if(definedColor == 'info') statusColor = 'text-blue-600';
    else if(definedColor == 'success') statusColor = 'text-teal-800';
</script>

<div class={`text-sm ${statusColor} rounded-lg flex gap-1`}>
    <div class="flex-shrink-0">
        {#if icon == 'warn'}
            <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path>
                <path d="M12 9v4"></path>
                <path d="M12 17h.01"></path>
            </svg>
        {:else if icon == 'error'}
            <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="m15 9-6 6"></path>
                <path d="m9 9 6 6"></path>
            </svg>
        {:else if icon == 'info'}
            <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
            </svg>
        {:else if icon == 'success'}
            <svg class="flex-shrink-0 size-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                <path d="m9 12 2 2 4-4"></path>
            </svg>
        {/if}
    </div>
    <p>
        <slot></slot>
    </p>
</div>