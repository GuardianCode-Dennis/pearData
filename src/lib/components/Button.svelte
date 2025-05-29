<script>
    import { createEventDispatcher } from 'svelte';

    export let customClass = "";
    export let title = "";
    export let target = "";
    export let href = "#";
    export let size = "large";

    const dispatch = createEventDispatcher();
    function handleClick(event) {
        event.preventDefault();
		dispatch('click', event);
	}
</script>

{#if title && size === "large"}
    {#if href === '#'}
        <a on:click={handleClick} href="{href}" target="{target}" class="text-lg font-medium w-full text-center flex items-center justify-center py-3 2xl:py-[15px] px-5 rounded-[10px] bg-linear-90 transition-all from-gradient-start to-gradient-end {customClass}">
            {title}
        </a>
    {:else}
        <a href="{href}" target="{target}" class="text-lg font-medium w-full text-center flex items-center justify-center py-3 2xl:py-[15px] px-5 rounded-[10px] bg-linear-90 transition-all from-gradient-start to-gradient-end {customClass}">
            {title}
        </a>
    {/if}
{/if}


{#if title && size === "small"}
    <a href="{href}" target="{target}" class="text-lg whitespace-nowrap font-medium w-full text-center flex items-center justify-center py-2 px-4 rounded-[10px] bg-linear-90 transition-all border hover:bg-primary hover:border-primary {customClass}">
        {title}
    </a>
{/if}