import type { TYPES } from "$lib/store/types";

export type PokemonCell = {
    id: number;
    status: KeyState;
}

export type PokemonRow = PokemonCell[];
export type PokemonGame = PokemonRow[];

export type PokemonKey = {
    id: number;
    type: number;
    pokemon: ElementRef;
}

export type Type = {
    id: number;
    type: TypeLang,
    weaknesses: TYPES[],
    strengths: TYPES[],
};

type TypeLang = {
    fr: string;
    en: string;
}

export type CellStatus = {
    status: KeyState,
    isStatus: boolean,
}

export type UseType = 'key' | 'action' | 'item';
export type ItemType = 'blank' | 'potion' | 'pokeball';
export type KeyState = 'blank' | 'misplaced' | 'correct' | 'wrong' | 'clue' | 'guess';

export type Item = {
    id: number;
    name: ItemType;
    uses: number;
    roll: number;
}

export type GuessMap = Record<KeyState, string>
export type ItemMap = Record<ItemType, string>

type ElementRef = {
    [key: string]: string;
}