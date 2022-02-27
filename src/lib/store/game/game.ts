import { get, writable } from "svelte/store";
import type { PokemonGame, PokemonRow, KeyState } from "$lib/types/Types";
import { MAX_TRIALS } from "$lib/constants";

export const createGame = () => {
    const empty: PokemonGame = [...Array(MAX_TRIALS)]
        .map(() => ([
            { id: 0, status: "blank" },
            { id: 0, status: "blank" },
            { id: 0, status: "blank" },
            { id: 0, status: "blank" },
            { id: 0, status: "blank" },
            { id: 0, status: "blank" }
        ]));

    const { subscribe, set, update } = writable(empty);

    // Adds selected Pokémon to the game board
    const write = (id: number, row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === 0);
        if (cell !== -1) {
            game[row][cell] = { id, status: 'blank' };
        }
        return game;
    });

    // Removes the last selected Pokémon from the game board
    const backspace = (row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === 0);
        const position = (cell > 0 ? cell : game[row].length) - 1;
        game[row][position] = { id: 0, status: 'blank' };
        return game;
    });

    /* 3 steps verification: all correct, then all wrong, then calculs based on the remaining. */
    const verify = (row: number, challenge: number[]) => update(game => {
        const correctRow: PokemonRow = game[row].map((cell, index) => ({ id: cell.id, status: cell.id === challenge[index] ? 'correct' : cell.status }));
        const wrongRow: PokemonRow = correctRow.map((cell) => ({ id: cell.id, status: !challenge.includes(cell.id) ? 'wrong' : cell.status }));

        const misplacedRow: PokemonRow = wrongRow.map((cell, _, cells) => {
            if (['blank', 'wrong'].includes(cell.status)) {
                const siblings = cells.filter(c => c.id === cell.id);

                const challengeSiblings = challenge.filter(c => c === cell.id);

                const correctS = siblings.filter(c => c.id === cell.id && c.status === 'correct').length;

                const misplaced = challengeSiblings.length - correctS;

                const wrong = siblings.length - misplaced - correctS;

                return {
                    id: cell.id,
                    status: wrong > 0 ? 'wrong' : misplaced > 0 ? 'misplaced' : 'correct'
                };
            }
            return cell;
        });

        game[row] = misplacedRow;
        return game;
    });

    const reset = () => set(empty);

    return {
        subscribe,
        write,
        backspace,
        verify,
        reset,
    }
}