<script lang="ts">
    export let darkMode = false;
    export let heightOffset = 10;

    let scrollBarStyle = `
        flex flex-col gap-3
        overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
    `;

    if(darkMode) {
        scrollBarStyle =
			scrollBarStyle +
			' dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500';
    }
</script>

<div class={scrollBarStyle} style="max-height: calc(95vh - {heightOffset}%);">
    <slot></slot>
</div>