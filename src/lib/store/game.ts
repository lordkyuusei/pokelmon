import { derived, get, writable } from 'svelte/store';
import type { PokemonGame } from '$lib/types/Types';

const createProposal = () => {
    const { subscribe, set, update } = writable([]);

    const init = (_) => update(proposal => {
        return ['335', '127', '192', '65', '181', '706'];
    });

    return {
        subscribe,
        init
    }
}

const createTries = () => {
    const { subscribe, set, update } = writable(1);

    return {
        subscribe,
        increment: () => update(tries => tries + 1),
        reset: () => set(1),
    }
}

const createGame = () => {
    const empty: PokemonGame = [
        [{ id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }],
        [{ id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }],
        [{ id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }],
        [{ id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }],
        [{ id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }],
        [{ id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }, { id: '', status: 'blank' }],
    ];

    const { subscribe, set, update } = writable(empty);

    // Adds selected Pokémon to the game board
    const write = (id: number, row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === '');
        if (cell !== -1) {
            game[row][cell] = { id: id.toString(), status: 'blank' };
        }
        return game;
    });

    // Removes the last selected Pokémon from the game board
    const backspace = (row: number) => update(game => {
        const cell = game[row].findIndex(c => c.id === '');
        const position = (cell > 0 ? cell : game[row].length) - 1;
        game[row][position] = { id: '', status: 'blank' };
        return game;
    });

    const verify = (row: number, proposal: string[]) => update(game => {
        const misplaced = {}

        const gameRow = game[row].map((cell, index) => {
            if (cell.id === proposal[index]) {
                cell.status = 'correct';
            } else if (proposal.includes(cell.id)) {
                const nbr = proposal.filter(p => p === cell.id).length;
                const curr = misplaced[cell.id] || 0;
                if (curr < nbr) {
                    misplaced[cell.id] = curr + 1;
                    cell.status = 'misplaced';
                } else {
                    cell.status = 'wrong';
                }
            } else {
                cell.status = 'wrong';
            }
            return cell;
        });
        game[row] = gameRow;
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

export const game = createGame();
export const tries = createTries();
export const proposal = createProposal();

export const isWin = derived(
    game,
    $game => $game[get(tries) - 1].every(cell => cell.status === 'correct')
);

export const isLost = derived(
    tries,
    $tries => $tries > 5 && !isWin
);
