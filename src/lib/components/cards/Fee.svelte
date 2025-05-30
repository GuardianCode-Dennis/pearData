<script>
    // Imports
    import Card from "$lib/components/Card.svelte";
    import Number from "$lib/components/Number.svelte";
    import Button from "$lib/components/Button.svelte";
    import PopupToken from "$lib/components/popups/PopupToken.svelte";

    // Functions
    import { dateFormat } from "$lib/utils/dateFormat.js";

    // Stores
    import { showTokenPopup } from "$lib/stores/tokenPopup.js";
    import { cookieData } from "$lib/stores/cookieData.js";
    import { generalData } from "$lib/stores/generalData";

    // Props
    $: dailyFee = $generalData.dailyFees || 0;
    $: weeklyFee = $generalData.weeklyFees || 0;

    // Variables
    const todayDate = dateFormat(new Date().toISOString().slice(0, 10));
    let stPear = $cookieData.stPear || 0;
    let stakedPrice = $cookieData.stakedPrice || 0;
    let totalPearStaked = $generalData.totalPearStaked;
    let yourStakingPercentage = (stPear / totalPearStaked) * 100 || 0;
    let feePercentage = 0.06;

    let stakersPercentage = 80;
    let dollarValueToStakers = dailyFee * (stakersPercentage / 100);
    let dollarValueToStakersAPR = weeklyFee * (stakersPercentage / 100);
    let yourStakingAmountInDollars = dollarValueToStakers * (yourStakingPercentage / 100);
    let yourStakingAmountInDollarsAPR = dollarValueToStakersAPR * (yourStakingPercentage / 100);
    
    // APR
    let yourAPR = stakedPrice > 0 ? ((yourStakingAmountInDollarsAPR / stakedPrice) * 365 * 100) : 0;

    $: {
        stPear = $cookieData.stPear || 0;
        stakedPrice = $cookieData.stakedPrice || 0;
        totalPearStaked = $generalData.totalPearStaked;
        yourStakingPercentage = (stPear / totalPearStaked) * 100 || 0;

        stakersPercentage = 80;
        dollarValueToStakers = dailyFee * (stakersPercentage / 100);
        dollarValueToStakersAPR = weeklyFee * (stakersPercentage / 100);
        yourStakingAmountInDollars = dollarValueToStakers * (yourStakingPercentage / 100);
        yourStakingAmountInDollarsAPR = dollarValueToStakersAPR * (yourStakingPercentage / 100);
        
        // APR
        yourAPR = stakedPrice > 0 ? ((yourStakingAmountInDollarsAPR / stakedPrice) * 365 * 100) : 0;
    }

    // Token popup
    const updateTokenPopup = () => {
        showTokenPopup.set(true);
    };
</script>

<PopupToken {stPear} {stakedPrice} />

<Card customClass="flex flex-col justify-between relative z-[1]">
    <div class="flex justify-between items-start">
        <div class="flex flex-col">
            <span class="text-sm flex">{todayDate} - Estimated fees ({feePercentage}%)</span>
            <div class="flex flex-col relative">
                <div class="flex">
                    <Number number={dailyFee} type="dollar" size="big" />
                </div>
                <span class="text-[10px] italic mt-1">Fees are estimated based on a {feePercentage}% trading fee. Actual fees may vary. Your personal rewards are shown as a range (low to high); actual results may fall anywhere within this range.</span>
            </div>
        </div>
    </div>

    <hr class="mt-6 mb-8 md:mt-8 md:mb-10" />
    
    <div>
        <div class="relative">

            {#if $cookieData.stPear == 0}
                <div class="absolute -left-[40px] -top-[20px] w-[calc(100%+80px)] h-[calc(100%+30px)] bg-cards/70 backdrop-blur-[5px] flex justify-center items-center">
                    <div class="flex flex-col text-center justify-center items-center px-10 gap-4">
                        <h2 class="text-xl md:text-2xl font-bold">Track Your Daily Rewards</h2>
                        <p class="w-full max-w-[300px]">Add your stPEAR holdings to start seeing your estimated daily rewards and personalized average APR — instantly and privately.</p>
                        <p class="text-xs italic w-full max-w-[300px]">Note: This is 100% manual and private. Your data is stored locally on your device using cookies — no wallet connection or external storage needed.</p>                    
                    </div>
                </div>
            {/if}

            <div class="flex flex-col">
                <span class="text-sm flex">Your estimated rewards ({feePercentage / 2}% / {feePercentage}%)</span>
                <div class="flex gap-x-2 items-center flex-wrap">
                    <Number number={yourStakingAmountInDollars / 2} type="dollar" size="normal" />
                    <span class="text-3xl text-white/20"> / </span>
                    <Number number={yourStakingAmountInDollars} type="dollar" size="normal" />
                </div>
            </div>

            <div class="grid grid-cols-2 2xl:grid-cols-[160px_1fr] gap-7 mt-8">

                <div class="flex flex-col gap-1">
                    <span class="text-sm flex md:hidden">stPear balance</span>
                    <span class="text-sm hidden md:flex">Your stPear balance</span>
                    <Number number={stPear} type="normal" size="small" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-sm flex">Total Pear staked</span>
                    <Number number={totalPearStaked} type="normal" size="small" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-sm flex md:hidden">Your Percentage</span>
                    <span class="text-sm hidden md:flex">Staking percentage</span>
                    <Number number={yourStakingPercentage} type="percentage" decimals={5} size="small" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-sm flex">Your APR (7 days)</span>
                    {#if stakedPrice > 0 && stakedPrice !== 'undefined'}
                        <div class="flex flex-row gap-x-2 items-center flex-wrap">
                            <Number number={yourAPR / 2} type="percentage" decimals={2} size="small" />
                            <span class="text-xl text-white/20"> / </span>
                            <Number number={yourAPR} type="percentage" decimals={2} size="small" />
                        </div>
                    {:else}
                        <span class="text-lg italic">-</span>
                    {/if}
                </div>
            </div>

        </div>

        {#if $cookieData.stPear == 0}
            <Button on:click={updateTokenPopup} title="Add your stPear" herf="#" customClass="mt-8" />
        {:else}
            <Button on:click={updateTokenPopup} title="Update amount of stPear" herf="#" customClass="mt-8" />
        {/if}
    </div>
</Card>