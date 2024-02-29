<script lang="ts">
    export let darkMode = false;
    export let title = false;

    let cardTitleStyle = `text-lg font-bold text-gray-800`;
	let cardDescriptionStyle = `mt-2 text-gray-500`;

    if(darkMode) {
        cardTitleStyle = cardTitleStyle + ' dark:text-white';
		cardDescriptionStyle = cardDescriptionStyle + ' dark:text-gray-400';
    }
</script>

{#if title}
    <h3 class={cardTitleStyle}>
        <slot></slot>
    </h3>
{:else}
    <p class={cardDescriptionStyle}>
        <slot></slot>
    </p>
{/if}
