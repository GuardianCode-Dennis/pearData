import { writable } from "svelte/store";

// Create a writable store for party mode
export const partyMode = writable(false);