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

export type KeyState = 'blank' | 'misplaced' | 'correct' | 'wrong';

type ElementRef = {
    [key: string]: string;
}