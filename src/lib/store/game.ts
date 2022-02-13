import { derived, get, writable } from 'svelte/store';
import type { PokemonGame } from '$lib/types/Types';
import pokemon from '$lib/store/alphabet.json';

const createProposal = () => {
    const { subscribe, set, update } = writable([]);

    const init = (_) => update(proposal => {
        const challenge = [...Array(6)].map(() => Math.floor(Math.random() * pokemon.length));
        return challenge.map(id => `${pokemon[id].id}`);
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

        const validatedRow = game[row].map((cell, index) => {
            cell.status = cell.id === proposal[index] ? 'correct' : 'wrong'
            return cell;
        })

        const validatedCells = validatedRow.filter(cell => cell.status === 'correct');

        const completeRow = validatedRow.map((cell, index) => {
            if (cell.status === 'wrong' && proposal.includes(cell.id)) {
                const total = validatedRow.filter(c => c.id === cell.id).length;
                const totalGood = validatedCells.filter(c => c.id === cell.id).length;
                if (total > totalGood) {
                    cell.status = 'misplaced';
                }
            }
            return cell;
        });

        game[row] = completeRow;
        return game;
    });

    const getCellStatus = (id: number, current: number) => {
        if (current < 0) {
            return 'blank';
        }
        const board = get(game);
        const lastRow = board[current];
        const index = lastRow.findIndex(c => c.id === id.toString());
        if (index >= 0) {
            return lastRow[index].status;
        } else {
            const cell = board.find(row => row.find(cell => cell.id === id.toString()));
            return cell ? cell[0].status : 'blank';
        }
    }

    const reset = () => set(empty);

    return {
        subscribe,
        write,
        backspace,
        verify,
        getCellStatus,
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
    $tries => !get(isWin) && $tries > 6
);
