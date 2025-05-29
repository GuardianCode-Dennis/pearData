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
    import { setupGeneralDataRefresh } from '$lib/utils/refreshGeneralData.js';
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

    setupGeneralDataRefresh((updatedData) => {
        saveGeneralDataStore(generalData, updatedData);
    }, import.meta.env.VITE_INTERNAL_API_KEY);
    // End of updating stores

    // Variables
    $: totalVolume = $generalData.totalVolume || 0;
    $: dailyVolume = $generalData.dailyVolume || 0;
    $: dailtATHDate = dateFormat($generalData.dailyATH.date);

    // Reactive variables
    $: newDailyVolume = dailyVolume;
    $: newTotalVolume = totalVolume;

    $: dataDailyVolume = {
        "May 1, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 2, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 3, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 4, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 5, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 6, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 7, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 8, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 9, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 10, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 11, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 12, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 13, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 14, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 15, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 16, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 17, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 18, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 19, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 20, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 21, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 22, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 23, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 24, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 25, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 26, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 27, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 28, 2025": Math.random() * (10000000 - 3000000) + 3000000,
        "May 29, 2025": Math.random() * (10000000 - 1000000) + 1000000,
        "May 30, 2025": dailyVolume,
    }

    let dataTotalVolume = {
        "1": 1000000,
        "2": 1500000,
        "3": 2000000,
        "4": 2500000,
        "5": 3000000,
        "6": 3500000,
        "7": 4000000,
        "8": 4500000,
        "9": 5000000,
        "10": 5500000,
        "11": 6000000,
        "12": 6500000,
        "13": 7000000,
        "14": 7500000,
        "15": 8000000,
        "16": 8500000,
        "17": 9000000,
        "18": 9500000,
        "19": 10000000,
        "20": 10500000,
        "21": 11000000,
        "22": 11500000,
        "23": 12000000,
        "24": 12500000,
        "25": 13000000,
        "26": 13500000,
        "27": 14000000,
        "28": 14500000,
        "29": 15000000,
        "30": 15500000,
        "31": 16000000,
        "32": 16500000,
        "33": 17000000,
        "34": 17500000,
        "35": 18000000,
        "36": 18500000,
        "37": 19000000,
        "38": 19500000,
        "39": 20000000,
        "40": 20500000,
        "41": 21000000,
        "42": 21500000,
        "43": 22000000,
        "44": 22500000,
        "45": 23000000,
        "46": 23500000,
        "47": 24000000,
        "48": 24500000,
        "49": 25000000,
        "50": 25500000,
        "51": 26000000,
        "52": 26500000,
        "53": 27000000,
        "54": 27500000,
        "55": 28000000,
        "56": 28500000,
        "57": 29000000,
        "58": 29500000,
        "59": 30000000,
        "60": 30500000,
        "61": 31000000,
        "62": 31500000,
        "63": 42000000,
        "64": 42500000,
        "65": 46000000,
        "66": 47800000,
        "67": 53000000,
        "68": 54000000,
        "69": 55000000,
        "70": 56000000,
        "71": 57000000,
        "72": 58000000,
        "73": 59000000,
        "74": 60000000,
        "75": 61000000,
        "76": 62000000,
        "77": 63000000,
        "78": 64000000,
        "79": 65000000,
        "80": 66000000,
        "81": 67000000,
        "82": 68000000,
        "83": 69000000,
        "84": 70000000,
        "85": 71000000,
        "86": 72000000,
        "87": 73000000,
        "88": 74000000,
        "89": 75000000,
        "90": 76000000,
        "91": 77000000,
        "92": 78000000,
        "93": 79000000,
        "94": 80000000,
        "95": 81000000,
        "96": 82000000,
        "97": 83000000,
        "98": 84000000,
        "99": 85000000,
        "100": 86000000,
    }

    // Gradient bars
    const startColor = '#00E49D';
    const endColor = '#029C2E';
    const fillArray = chroma.scale([startColor, endColor]).mode('lab').colors(Object.keys(dataTotalVolume).length);
</script>

<div class="flex flex-col pr-6 lg:pr-12 xl:pr-20 pb-25 lg:pb-20 py-10 lg:py-17">
    <div class="flex flex-row md:pt-2 lg:pt-0 -mt-3 lg:-mt-0 items-center flex-wrap justify-between gap-6 md:gap-8">
        <div>
            <PageHeader title="Pear Protocol Analytics" />
        </div>
        <div class="text-left -mb-1 bg-linear-90 rounded-xl hidden lg:flex gap-8 items-center w-full md:w-auto">
            <span class="text lg:whitespace-nowrap">Start trading on Pear and earn rewards</span>
            <div class="w-[150px]">
                <Button title="Start trading" size="small" href="https://intent.pear.garden/trade/BTC-ETH" target="_blank" />
            </div>
        </div>
    </div>

    <div class="grid xl:grid-cols-[1fr_400px] 2xl:grid-cols-[1fr_490px] gap-6 md:gap-8 2xl:gap-[50px] mt-10 lg:mt-19 relative">
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
                <LinkedChart data={dataDailyVolume}
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
                    <LinkedChart data={dataTotalVolume}
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