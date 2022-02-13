import { writable } from "svelte/store";
import pokemon from '$lib/store/alphabet.json';

export const createProposal = () => {
    const { subscribe, set } = writable([]);

    const init = (_: any) => {
        const challenge = [...Array(6)].map(() => Math.floor(Math.random() * pokemon.length));
        const proposal = challenge.map(id => pokemon[id].id);
        set(proposal);
    };

    return {
        subscribe,
        init
    }
}