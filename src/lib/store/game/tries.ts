import { writable } from "svelte/store";

export const createTries = () => {
    const { subscribe, set, update } = writable(1);

    return {
        subscribe,
        increment: () => update(tries => tries + 1),
        decrement: () => update(tries => tries - 1),
        reset: () => set(1),
    }
}