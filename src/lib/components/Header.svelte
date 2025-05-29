<script>
    // Imports
    import Logo from '$lib/components/Logo.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<div class="flex flex-col w-full lg:max-w-[157px] px-3 lg:px-0 items-start lg:items-center py-5 lg:py-[50px] gap-5 lg:gap-10 relative lg:fixed top-0 left-0 overflow-auto h-20 lg:h-screen">
    <div class="[&_svg]:w-15 [&_svg]:h-15 [&_svg]:lg:w-20 [&_svg]:lg:h-20"><Logo /></div>
    <div class="bg-black/15 w-13 lg:w-15 h-[248px] rounded-full hidden lg:flex"></div>
</div>

<div class="fixed lg:hidden bottom-0 left-0 w-screen h-20 bg-primary/20 z-[100] backdrop-blur-3xl flex justify-between items-center px-6">
    <div>
        menu
    </div>
    <div class="w-[150px]">
        <Button title="Start trading" href="https://www.google.nl" target="_blank" />
    </div>
</div>