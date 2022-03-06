import { writable } from 'svelte/store';

import { ITEMS_ROLL } from '$lib/constants';
import type { Item, ItemType } from '$lib/types/Types';

export const createItems = () => {
    const items: Item[] = [
        { id: 1, name: 'potion', uses: 0, roll: ITEMS_ROLL[1] },
        { id: 2, name: 'pokeball', uses: 0, roll: ITEMS_ROLL[2] },
        { id: -1, name: 'blank', uses: 0, roll: ITEMS_ROLL[0], },
    ]

    const blank = items[items.length - 1];

    const { subscribe, set, update } = writable(blank);

    const rollItem = () => {
        const item = items.find(i => Math.random() < i.roll) || null;
        set(item);
    }

    const wasUsed = (name: ItemType) => update(item => {
        const update = items.findIndex(i => i.name === item.name);
        items[update].uses += 1;
        return blank;
    })

    const showStats = () => items.map(i => ({ name: i.name, uses: i.uses }))

    return {
        subscribe,
        rollItem,
        wasUsed,
        showStats,
    }
}