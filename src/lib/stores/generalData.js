import { writable } from "svelte/store";

// Create an exportable array with stPear and stakedPrice
export const generalData = writable({
    dailyVolume: 0,
    dailyUsers: 0,
    dailyFees: 0,
    totalVolume: 0,
    weeklyVolume: 0,
    monthlyVolume: 0,
    dailyATH: {
        volume: 0,
        date: "2025-01-01"
    },
    partyMode: false,
    totalPearStaled: 0,
});