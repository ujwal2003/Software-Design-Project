<script lang="ts">
    export let darkMode = false;
    export let heightOffset = 10;

    export let tailwindAppend: string = '';
    export let noFlex: boolean = false;

    let scrollBarStyle = `
        overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300
    `;

    if(!noFlex) {
        scrollBarStyle = 'flex flex-col gap-3 ' + scrollBarStyle;
    }

    if(darkMode) {
        scrollBarStyle =
			scrollBarStyle +
			' dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500';
    }
</script>

<div class={scrollBarStyle+tailwindAppend} style="max-height: calc(95vh - {heightOffset}%);">
    <slot></slot>
</div>