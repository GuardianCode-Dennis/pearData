import { writable } from "svelte/store";

// Create an exportable array with stPear and stakedPrice
export const cookieData = writable({
    stPear: 0,
    stakedPrice: 0
});