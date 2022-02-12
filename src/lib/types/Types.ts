export type PokemonCell = {
    id: string;
    status: KeyState;
}

export type PokemonRow = PokemonCell[];
export type PokemonGame = PokemonRow[];

export type PokemonKey = {
    id: number;
    type: ElementRef;
    pokemon: ElementRef;
}

export type KeyState = 'blank' | 'misplaced' | 'correct' | 'wrong' = 'blank';

type ElementRef = {
    [key: string]: string;
}