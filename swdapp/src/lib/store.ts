// stores.js
import { writable } from 'svelte/store';

// Create a writable store with an initial value
export const myStore = writable({test: "test"});

// Function to update the store
export function updateStore(newValue: any) {
    myStore.set(newValue);
}