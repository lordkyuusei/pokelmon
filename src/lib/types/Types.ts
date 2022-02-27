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

export type CellStatus = {
    status: KeyState,
    isStatus: boolean,
}

export type UseType = 'key' | 'action' | 'item';
export type ItemType = 'blank' | 'potion' | 'pokeball';
export type KeyState = 'blank' | 'misplaced' | 'correct' | 'wrong' | 'clue';

export type Item = {
    id: number;
    name: ItemType;
    roll: number;
}

type ElementRef = {
    [key: string]: string;
}