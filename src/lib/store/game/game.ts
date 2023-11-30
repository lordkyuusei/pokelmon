import { writable } from "svelte/store";

import { MAX_TRIALS } from "$lib/constants";
import type { PokemonGame, PokemonRow } from "$lib/types/Types";

export const createGame = () => {
    const empty: PokemonGame = [...Array(MAX_TRIALS)]
        .map(() => ([
            { id: 0, status: "blank", isDupe: false },
            { id: 0, status: "blank", isDupe: false },
            { id: 0, status: "blank", isDupe: false },
            { id: 0, status: "blank", isDupe: false },
            { id: 0, status: "blank", isDupe: false },
            { id: 0, status: "blank", isDupe: false }
        ]));

    const { subscribe, set, update } = writable(empty);

    // Adds selected Pokémon to the game board
    const write = (id: number, row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === 0);
        if (cell !== -1) {
            game[row][cell] = { id, status: 'blank', isDupe: false };
        }
        if (cell + 1 < game[row].length) {
            game[row][cell + 1] = { id: 0, status: 'guess', isDupe: false };
        }
        return game;
    });

    // Removes the last selected Pokémon from the game board
    const backspace = (row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === 0);
        const position = (cell >= 0 ? cell : game[row].length) - 1;
        game[row][position] = { id: 0, status: 'guess', isDupe: false };
        if (position + 1 < game[row].length) {
            game[row][position + 1] = { id: 0, status: 'blank', isDupe: false };
        }
        return game;
    });

    const removeLastTry = () => update(game => {
        game = game.map((_, id) => game[Math.min(id + 1, MAX_TRIALS - 1)]);
        return game;
    });

    const showClue = (row: number, proposal: number[]) => update(game => {
        const firstBlank = game[row].findIndex(c => c.id === 0);
        if (-1 < firstBlank && firstBlank <= game[row].length - 1) {
            const clue = proposal[firstBlank];
            game[row][firstBlank] = { id: clue, status: "clue", isDupe: false };
        }
        return game;
    });

    /* 3 steps verification: all correct, then all wrong, then calculs based on the remaining. */
    const verify = (row: number, challenge: number[]) => update(game => {
        const correctRow: PokemonRow = game[row].map((cell, index) => ({ id: cell.id, status: cell.id === challenge[index] ? 'correct' : cell.status, isDupe: challenge.filter(c => c === cell.id).length > 1 }));
        const wrongRow: PokemonRow = correctRow.map((cell) => ({ id: cell.id, status: !challenge.includes(cell.id) ? 'wrong' : cell.status, isDupe: cell.isDupe }));

        const misplacedRow: PokemonRow = wrongRow.map((cell, index, cells) => {
            if (['blank'].includes(cell.status)) {

                const siblingsInChallenge: any[] = challenge.map((c, i) => ({ id: c, i })).filter(c => c.id === cell.id);
                const siblingsInTheGuess: any[] = cells.map((c, i) => ({ id: c.id, i })).filter(c => c.id === cell.id);

                const correctSiblingsPos: number[] = siblingsInChallenge.filter(c => siblingsInTheGuess.find(s => s.i === c.i)).map(c => c.i);
                const wrongSiblingsPos: number[] = siblingsInTheGuess.filter(c => !correctSiblingsPos.includes(c.i)).map(c => c.i);

                const maxMisplaced = siblingsInChallenge.length;
                const misplacedNbr = maxMisplaced - correctSiblingsPos.length;

                const isWrong = siblingsInChallenge.length === correctSiblingsPos.length;
                const isDupe = siblingsInChallenge.length > 1;
                const thisCellPosition = wrongSiblingsPos.findIndex(c => c === index);

                return {
                    id: cell.id,
                    status: isWrong ? 'wrong' : thisCellPosition < misplacedNbr ? 'misplaced' : 'wrong',
                    isDupe
                };
            }
            return cell;
        });

        game[row] = misplacedRow;
        if (row + 1 < game.length) {
            game[row + 1][0] = { id: 0, status: 'guess', isDupe: false };
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