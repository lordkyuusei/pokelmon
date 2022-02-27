import { writable } from 'svelte/store';

import { ITEMS_ROLL } from '$lib/constants';
import type { Item } from '$lib/types/Types';

export const createItems = () => {
    const items: Item[] = [
        { id: 1, name: 'potion', roll: ITEMS_ROLL[1] },
        { id: 2, name: 'pokeball', roll: ITEMS_ROLL[2] + 1 },
        { id: -1, name: 'blank', roll: ITEMS_ROLL[0], },
    ]

    const blank = items[items.length - 1];

    const { subscribe, set } = writable(blank);

    const rollItem = () => {
        const item = items.find(i => Math.random() < i.roll) || null;
        console.log("rolled, ", item.name, item.roll, ITEMS_ROLL[1]);
        set(item);
    }

    const reset = () => set(blank);

    return {
        subscribe,
        rollItem,
        reset,
    }
}