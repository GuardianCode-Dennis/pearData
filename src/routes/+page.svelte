<script>
    // Imports
    import Number from "$lib/components/Number.svelte";
    import PageHeader from "$lib/components/PageHeader.svelte";
    import Card from "$lib/components/Card.svelte";
    import Update from "$lib/components/Update.svelte";
    import Logo from "$lib/components/Logo.svelte";
    import Button from "$lib/components/Button.svelte";
    import Fee from "$lib/components/cards/Fee.svelte";
    import {LinkedChart, LinkedLabel, LinkedValue} from "svelte-tiny-linked-charts";
    import chroma from 'chroma-js';
    import { onMount } from 'svelte';
    import { setupDataRefresh } from '$lib/utils/refreshData.js';
    import { saveGeneralDataStore } from '$lib/utils/saveGeneralDataStore.js';

    // Functions
    import { dateFormat } from "$lib/utils/dateFormat.js";

    // Stores
    import { cookieData } from "$lib/stores/cookieData.js";
    import { generalData } from "$lib/stores/generalData.js";

    // Icons
    import Calendar from "$lib/components/icons/Calendar.svelte";

    // Blobs
    import BlobTwo from "$lib/components/blobs/BlobTwo.svelte";
    import BlobThree from "$lib/components/blobs/BlobThree.svelte";

    // Data
    export let data;
    
    // Update stores
    cookieData.set({
        stPear: data.stPear || 0,
        stakedPrice: data.stakedPrice || 0,
    });

    generalData.set({
        dailyVolume: data.generalData.dailyVolume || 0,
        dailyUsers: data.generalData.dailyUsers || 0,
        dailyFees: data.generalData.dailyFees || 0,
        totalVolume: data.generalData.totalVolume || 0,
        weeklyVolume: data.generalData.weeklyVolume || 0,
        monthlyVolume: data.generalData.monthlyVolume || 0,
        dailyATH: {
            date: data.generalData.dailyATH?.date || new Date().toISOString().slice(0, 10),
            volume: data.generalData.dailyATH?.volume || 0
        },
        partyMode: data.generalData.partyMode || false,
        totalPearStaked: data.generalData.totalPearStaked || 0,
    });

    setupDataRefresh((updatedData) => {
        saveGeneralDataStore(generalData, updatedData);
    }, '/api/general', import.meta.env.VITE_INTERNAL_API_KEY);
    // End of updating stores

    // Standard Variables
    const pageTitle = "Pear Protocol Analytics";
    const siteName = "PearData";

    // Reactive variables
    $: totalVolume = $generalData.totalVolume || 0;
    $: dailyVolume = $generalData.dailyVolume || 0;
    $: dailtATHDate = dateFormat($generalData.dailyATH.date);
    $: titleVolume = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(dailyVolume)
    $: newDailyVolume = dailyVolume;
    $: newTotalVolume = totalVolume;

    // Daily volume chart
    let dailyVolumeChart = {};
    data.combinedData.slice(-30).forEach((item) => {
        dailyVolumeChart[dateFormat(item.date)] = item.dailyVolume;
    });

    // Total volume chart
    let totalVolumeChart = {};
    data.combinedData.slice(-200).forEach((item) => {
        totalVolumeChart[dateFormat(item.date)] = item.totalVolume;
    });

    // Refresh chart data every 5 minutes
    setupDataRefresh((updatedData) => {
        const newDaily = {};
        updatedData.slice(-30).forEach((item) => {
            newDaily[dateFormat(item.date)] = item.dailyVolume;
        });
        dailyVolumeChart = newDaily;

        const newTotal = {};
        updatedData.slice(-200).forEach((item) => {
            newTotal[dateFormat(item.date)] = item.totalVolume;
        });
        totalVolumeChart = newTotal;
    }, '/api/combined', import.meta.env.VITE_INTERNAL_API_KEY);

    // Gradient bars
    const startColor = '#00E49D';
    const endColor = '#029C2E';
    const fillArray = chroma.scale([startColor, endColor]).mode('lab').colors(Object.keys(totalVolumeChart).length);
</script>

<svelte:head>
	<title>{titleVolume} - {pageTitle} | {siteName}</title>
</svelte:head>

<div class="flex flex-col pr-6 lg:pr-12 xl:pr-20 pb-25 lg:pb-20 py-10 lg:py-17">
    <div class="flex flex-row md:pt-2 lg:pt-0 -mt-3 lg:-mt-0 items-center flex-wrap justify-between gap-6 md:gap-8">
        <div>
            <PageHeader title={pageTitle} />
        </div>
        <div class="text-left -mb-1 bg-linear-90 rounded-xl hidden lg:flex gap-8 items-center w-full md:w-auto">
            <span class="text lg:whitespace-nowrap">Start trading on Pear and earn rewards</span>
            <div class="w-[150px]">
                <Button title="Start trading" size="small" href="https://intent.pear.garden/trade/BTC-ETH" target="_blank" />
            </div>
        </div>
    </div>

    <div class="grid xl:grid-cols-[1fr_400px] 2xl:grid-cols-[1fr_490px] gap-6 md:gap-8 2xl:gap-[50px] mt-10 lg:mt-17 relative">
        <div class="absolute right-20 z-0 hidden md:block">
            <BlobTwo />
        </div>

        <Card customClass="min-h-[300px] md:min-h-[500px] 2xl:min-h-[632px] max-w-full bg-linear-90 from-gradient-start to-gradient-end !p-0 relative z-[1]">
            <div class="[&_svg]:w-200 [&_svg]:h-200 absolute -right-90 -top-90 opacity-15"><Logo /></div>
            
            <div class="flex justify-between items-start p-6 md:p-10 2xl:p-12 pb-6 relative">
                <div class="flex flex-col">
                    <span class="text-sm daily-volume-current-text flex">Current daily volume</span>
                    <span class="text-sm daily-volume-hover-text hidden"><LinkedLabel linked="daily-volume" /></span>
                    <div class="flex flex-col relative">
                        <Number number={newDailyVolume} type="dollar" size="big" extra={true} />
                    </div>
                </div>
                <div class="absolute right-6 md:right-10 2xl:right-12 top-[22px] md:top-[37.5px] 2xl:top-12"><Update /></div>
            </div>

            <div class="linechart [&_svg]:w-[calc(100%+5px)] [&_svg]:h-[calc(100%-95px)] [&_svg]:-left-[4px] [&_svg]:relative h-full w-full">
                <LinkedChart data={dailyVolumeChart}
                    grow
                    linked="daily-volume"
                    transition={150}
                    fill="#00E49D"
                    gap={0.4}
                    onhover={({ value }) => {                       
                        const dailyVolumeTextElement = document.querySelector('.daily-volume-current-text');
                        const dailyVolumeHoverTextElement = document.querySelector('.daily-volume-hover-text');

                        if (dailyVolumeTextElement && dailyVolumeHoverTextElement) {
                            dailyVolumeTextElement.classList.add('hidden');
                            dailyVolumeHoverTextElement.classList.remove('hidden');
                        }

                        newDailyVolume = value;
                    }}
                    onblur={() => {
                        const dailyVolumeTextElement = document.querySelector('.daily-volume-current-text');
                        const dailyVolumeHoverTextElement = document.querySelector('.daily-volume-hover-text');

                        if (dailyVolumeTextElement && dailyVolumeHoverTextElement) {
                            dailyVolumeTextElement.classList.remove('hidden');
                            dailyVolumeHoverTextElement.classList.add('hidden');
                        }

                        newDailyVolume = dailyVolume;
                    }} />
            </div>

            <div class="h-[95px] bg-cards absolute bottom-0 w-full py-5 px-6 md:px-10 2xl:px-12 flex justify-between items-center">
                <div class="flex items-start gap-3 [&_path]:fill-primary">
                    <Calendar />
                    <div class="flex flex-col">
                        <span class="text-[12px] text-secondary">Daily All time high {#if dailtATHDate}- <strong>{dailtATHDate}</strong>{/if}</span>
                        <Number number={$generalData.dailyATH.volume} type="dollar" size="small" />
                    </div>
                </div>
            </div>
        </Card>

        <Fee />
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-[400px_1fr] 2xl:grid-cols-[490px_1fr] gap-6 md:gap-8 2xl:gap-[50px] mt-16 2xl:mt-18 relative">
        <div class="absolute hidden md:flex -left-40 z-[0]">
            <BlobThree />
        </div>

        <div class="xl:col-span-2 flex justify-between items-center realtive z-[1]">
            <span class="text-2xl font-medium">Total volume</span>
            <Update />
        </div>
        <div class="flex flex-col lg:flex-row xl:flex-col gap-6 md:gap-8 2xl:gap-[50px] relative z-[1]">
            <Card customClass="h-full min-h-[150px] md:min-h-[200px] 2xl:min-h-[295px] justify-center text-center items-center">
                <span class="text-sm daily-volume-current-text flex">Weekly volume</span>
                <div class="flex flex-col relative">
                    <Number number={$generalData.weeklyVolume} type="dollar" size="normal" />
                </div>
            </Card>
            <Card customClass="h-full min-h-[150px] md:min-h-[200px] 2xl:min-h-[295px] justify-center text-center items-center">
                <span class="text-sm daily-volume-current-text flex">Monthly volume</span>
                <div class="flex flex-col relative">
                    <Number number={$generalData.monthlyVolume} type="dollar" size="normal" />
                </div>
            </Card>
        </div>
        <div class="relative z-[1]">
            <Card customClass="h-full aspect-3/2 xl:aspect-[inherit] xl:min-h-[200px] 2xl:min-h-[295px] !p-0 relative">
                <div class="flex justify-between items-start p-6 md:p-10 2xl:p-12 pb-6">
                    <div class="flex flex-col">
                        <span class="text-sm total-volume-current-text flex">Total volume</span>
                        <span class="text-sm total-volume-hover-text hidden"><LinkedLabel linked="total-volume" /></span>
                        <div class="flex flex-col relative">
                            <Number number={newTotalVolume} type="dollar" size="big" />
                        </div>
                    </div>
                </div>

                <div class="linechart w-full total absolute bottom-0 left-0 flex items-end [&_svg]:w-[calc(100%+5px)] [&_svg]:h-[calc(100%-80px)] [&_svg]:lg:h-[calc(100%-50px)] [&_svg]:-left-[2px] [&_svg]:relative h-full">
                    <LinkedChart data={totalVolumeChart}
                        grow
                        linked="total-volume"
                        transition={150}
                        fill="#029C2E"
                        gap={0.4}
                        barMinWidth={1}
                        fillArray={fillArray}
                        fadeOpacity={0.35}
                        onhover={({ value }) => {                       
                            const totalVolumeTextElement = document.querySelector('.total-volume-current-text');
                            const totalVolumeHoverTextElement = document.querySelector('.total-volume-hover-text');

                            if (totalVolumeTextElement && totalVolumeHoverTextElement) {
                                totalVolumeTextElement.classList.add('hidden');
                                totalVolumeHoverTextElement.classList.remove('hidden');
                            }

                            newTotalVolume = value;
                        }}
                        onblur={() => {
                            const totalVolumeTextElement = document.querySelector('.total-volume-current-text');
                            const totalVolumeHoverTextElement = document.querySelector('.total-volume-hover-text');

                            if (totalVolumeTextElement && totalVolumeHoverTextElement) {
                                totalVolumeTextElement.classList.remove('hidden');
                                totalVolumeHoverTextElement.classList.add('hidden');
                            }

                            newTotalVolume = totalVolume;
                        }} />
                </div>
            </Card>
        </div>
    </div>
</div>