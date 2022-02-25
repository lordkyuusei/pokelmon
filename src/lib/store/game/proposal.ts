import { writable } from "svelte/store";
import pokemon from '$lib/store/alphabet.json';
import types from '$lib/store/types.json';

type Pokemon = {
    id: number;
    type: number;
    pokemon: { fr: string, en: string }
}

const Type = (id: number) => types.find(type => id === type.id)?.type.fr

const whichTypeIsSuperEffective = (type1, type2) => {
    if (types.find(type => type.id === type1).weaknesses.includes(type2)) {
        return 1;
    } else if (types.find(type => type.id === type2).weaknesses.includes(type1)) {
        return -1;
    } else {
        return 0;
    }
}

export const createProposal = () => {
    const { subscribe, set } = writable([]);

    const rollUntilNotWeak = (draw: Pokemon, previousType: number) => {
        if (whichTypeIsSuperEffective(draw.type, previousType) !== 0 || draw.type === previousType) {
            const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
            return rollUntilNotWeak(randomPokemon, previousType);
        } else {
            return draw;
        }
    }

    const init = (daily_challenge?: number[]) => {
        if (!daily_challenge) {
            let previousPokemonType = 1;
            const challenge = [...Array(6)].map(() => {
                const randomPokemon = pokemon[Math.floor(Math.random() * pokemon.length)];
                const finalPokemon = rollUntilNotWeak(randomPokemon, previousPokemonType);
                previousPokemonType = finalPokemon.type;
                return finalPokemon.id;
            });
            set(challenge);
            return challenge;
        }
        set(daily_challenge);
        return daily_challenge;
    };

    return {
        subscribe,
        init
    }
}