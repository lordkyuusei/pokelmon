import { writable } from "svelte/store";

import { MAX_TRIALS } from "$lib/constants";
import type { PokemonGame, PokemonRow } from "$lib/types/Types";

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
        if (cell + 1 < game[row].length) {
            game[row][cell + 1] = { id: 0, status: 'guess' };
        }
        return game;
    });

    // Removes the last selected Pokémon from the game board
    const backspace = (row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === 0);
        const position = (cell >= 0 ? cell : game[row].length) - 1;
        game[row][position] = { id: 0, status: 'guess' };
        if (position + 1 < game[row].length) {
            game[row][position + 1] = { id: 0, status: 'blank' };
        }
        return game;
    });

    const removeLastTry = (row: number) => update(game => {
        const gameRow = game[row];
        const blankRow: PokemonRow = gameRow.map(_ => ({ id: 0, status: "blank" }));
        game[row] = blankRow;
        return game;
    });

    const showClue = (row: number, proposal: number[]) => update(game => {
        const firstBlank = game[row].findIndex(c => c.id === 0);
        if (-1 < firstBlank && firstBlank <= game[row].length - 1) {
            const clue = proposal[firstBlank];
            game[row][firstBlank] = { id: clue, status: "clue" };
        }
        return game;
    });

    /* 3 steps verification: all correct, then all wrong, then calculs based on the remaining. */
    const verify = (row: number, challenge: number[]) => update(game => {
        const correctRow: PokemonRow = game[row].map((cell, index) => ({ id: cell.id, status: cell.id === challenge[index] ? 'correct' : cell.status }));
        const wrongRow: PokemonRow = correctRow.map((cell) => ({ id: cell.id, status: !challenge.includes(cell.id) ? 'wrong' : cell.status }));

        const misplacedRow: PokemonRow = wrongRow.map((cell, index, cells) => {
            if (['blank', 'wrong'].includes(cell.status)) {
                const cellsInChallenge = challenge.filter(c => c === cell.id);
                const cellsInGuess = cells.map((c, i) => ({ ...c, i })).filter(c => c.id === cell.id);

                const thisCellPosition = cellsInGuess.findIndex(c => c.i === index);

                const correctS = cellsInGuess.filter(c => c.id === cell.id && c.status === 'correct').length;
                const misplaced = cellsInChallenge.length - correctS;
                const wrong = cellsInGuess.length - misplaced - correctS;

                const isWrong = (wrong > 0 && misplaced > 0 && thisCellPosition > 0) || (wrong > 0 && misplaced === 0);
                const isMisplaced = (misplaced > 0);

                return {
                    id: cell.id,
                    status: isWrong ? 'wrong' : isMisplaced ? 'misplaced' : 'correct'
                };
            }
            return cell;
        });

        game[row] = misplacedRow;
        if (row + 1 < game.length) {
            game[row + 1][0] = { id: 0, status: 'guess' };
        }
        return game;
    });

    const reset = () => set(empty);

    return {
        subscribe,
        write,
        backspace,
        removeLastTry,
        verify,
        reset,
        showClue
    }
}