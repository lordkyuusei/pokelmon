import { derived, get } from 'svelte/store';
import { createGame } from './game/game';
import { createTries } from './game/tries';
import { createProposal } from './game/proposal';
import type { KeyState, PokemonCell, PokemonGame } from '$lib/types/Types';
import { MAX_TRIALS } from '$lib/constants';

export const game = createGame();
export const tries = createTries();
export const proposal = createProposal();

export const isLost = derived(tries, $tries => !get(isWin) && $tries > MAX_TRIALS);
export const isWin = derived(game, $game => $game.find(row => row.every(cell => cell.status === 'correct')) !== undefined);

type CellStatus = {
    status: KeyState,
    isStatus: boolean,
}

export const getCellStatus = (id: number, currentTry: number): KeyState => {
    if (currentTry > 1) {
        let index: number = currentTry - 2;
        const board: PokemonGame = get(game);
        for (let i = index; i >= 0; i--) {
            const cells: PokemonCell[] = board[i].filter(cell => cell.id === id);
            const state: CellStatus = ['correct', 'misplaced', 'wrong'].map((status: KeyState) =>
                ({ status, isStatus: cells.some(cell => cell.status === status) })
            ).find(({ isStatus }) => isStatus);
            if (state) {
                return state.status;
            }
        }
    }
    return 'blank';
}

