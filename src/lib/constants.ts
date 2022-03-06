import type { GuessMap, ItemMap } from "./types/Types";

export const POKEMON_SPRITE_REL_URL = '/keyboard/';
export const POKEMON_ICON_REL_URL = '/guessboard/';
export const POKEMON_SPRITE_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/';
export const POKEMON_ICON_URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/'
export const MAX_TRIALS = 6;
export const ITEMS_ROLL = [1, 0.2, 0.1];

export const ITEM_ICON_MAP: ItemMap = {
    blank: '🔘',
    potion: '💊',
    pokeball: '🔴'
};

export const GUESS_ICON_MAP: GuessMap = {
    blank: '🔳',
    wrong: '🟥',
    correct: '🟩',
    misplaced: '🟧',
    clue: '🟨',
    guess: '🟦',
}