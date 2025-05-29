<script>
    // Imports
    import Button from '$lib/components/Button.svelte';

    // Stores
    import { showTokenPopup } from "$lib/stores/tokenPopup.js";
    import { cookieData } from "$lib/stores/cookieData.js";
    
    // Variables
    export let stPear = 0;
    export let stakedPrice = 0;
    let succes = false;
    let error = false;

    // Functions
    function handleSubmit(event) {
        event.preventDefault(); // Prevent page reload
        error = false;
        succes = false;

        const form = event.target;
        const stakedPear = form.stakedPear.value;
        const stakedPearPrice = form.stakedPearPrice.value;

        // Save to cookie (expires in 30 days)
        const expiry = new Date();
        expiry.setDate(expiry.getDate() + 30);

        // If stakedPear is empty or is 0 remove cookie
        if (stakedPear === '') {
            error = true;
        } else if (stakedPear === '0') {
            document.cookie = 'stPear=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        } else {
            document.cookie = `stPear=${stakedPear}; expires=${expiry.toUTCString()}; path=/`;
        }

        // If stakedPrice is empty or is 0 remove cookie
        if (stakedPearPrice === '') {
            error = true;
        } else if (stakedPearPrice === '0') {
            document.cookie = 'stakedPrice=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
        } else {
            document.cookie = `stakedPrice=${stakedPearPrice}; expires=${expiry.toUTCString()}; path=/`;
        }
        
        if (!error) {
            succes = true;
        }

        if (succes) {
            // Save to cookieData store
            cookieData.set({
                stPear: stakedPear,
                stakedPrice: stakedPearPrice,
            });

            showTokenPopup.set(false);
        }
    }

    const closePopup = () => {
        showTokenPopup.set(false);
        succes = false;
        error = false;
    };
</script>

<div class="fixed inset-0 w-screen h-screen flex justify-center items-center z-[200] bg-primary/20 backdrop-blur-lg p-6 shadow-2xl {$showTokenPopup ? '' : 'opacity-0 invisible'} transition-all">
    <div class="bg-cards w-full max-w-[500px] p-6 md:p-10 2xl:p-12 max-h-[100%] rounded-cards overflow-auto relative">
        <button aria-label="close" class="absolute right-0 top-0 p-3 md:p-6 cursor-pointer" on:click={closePopup}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor" />
            </svg>
        </button>
        <div class="bg-red-400 mt-2 py-3 px-6 rounded-md mb-5 text-center justify-center {error ? 'flex' : 'hidden'}">Error: Please fill in the required fields</div>
        
        <span class="number leading-10 md:leading-13 font-medium">Estimate your rewards and APR</span>
        <p class="mt-2 text-base">To calculate your daily earnings and projected APR, please enter the follwing fields.</p>
        <p class="mt-4 text-xs italic w-full max-w-[300px]">Note: This is 100% manual and private. Your data is stored locally on your device using cookies — no wallet connection or external storage needed.</p>                    

        <hr class="mt-6 mb-6 md:mt-8 md:mb-6" />

        <form class="mt-8 flex flex-col gap-6" on:submit={handleSubmit}>
            <label>
                <span class="text-sm">The amount of Pear you have staked</span>
                <input type="number" min={0} name="stakedPear" value={stPear} placeholder="" class="w-full mt-3 py-3 px-5 border border-black/20 rounded-md bg-black/20 focus:outline-0" />
            </label>

            <label class="flex flex-col">
                <span class="text-sm">Total amount you paid for the staked Pear (optional)</span>
                <span class="mt-1 italic text-xs">We use this to calculate your APR</span>
                <input type="number" min={0} name="stakedPearPrice" value={stakedPrice} placeholder="" class="w-full mt-3 py-3 px-5 border border-black/20 rounded-md bg-black/20 focus:outline-0" />
            </label>

            <button type="submit" class="cursor-pointer md:mt-3 text-lg font-medium w-full text-center flex items-center justify-center py-3 2xl:py-[15px] px-5 rounded-[10px] bg-linear-90 transition-all from-gradient-start to-gradient-end">Save your stPear</button>
        </form>
    </div>
</div>