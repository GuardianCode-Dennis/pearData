<script>
    export let title = "";
</script>

{#if title}
    <div class="w-full">
        <h1 class="text-2xl leading-5 font-medium tracking-[0.5px]">{title}</h1>
    </div>
{/if}