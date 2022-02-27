import { derived, get } from 'svelte/store';

import { createGame } from './game/game';
import { createItems } from './game/item';
import { createTries } from './game/tries';
import { createProposal } from './game/proposal';

import { MAX_TRIALS } from '$lib/constants';
import type { CellStatus, KeyState, PokemonCell, PokemonGame } from '$lib/types/Types';

export const game = createGame();
export const tries = createTries();
export const proposal = createProposal();
export const item = createItems();

export const hasItem = derived(item, $item => $item.id > 0);
export const isLost = derived(tries, $tries => !get(isWin) && $tries > MAX_TRIALS);
export const isWin = derived(game, $game => $game.find(row => row.every(cell => cell.status === 'correct')) !== undefined);

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

