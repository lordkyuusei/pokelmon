<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isWin, isLost } from '$lib/store/game';
	import Key from './Key.svelte';
	import pokemon from '$lib/store/alphabet.json';
	import type { PokemonKey } from '$lib/types/Types';
	import { handleKeyboardEvent } from '$lib/store/keyboardEvent';

	const dispatch = createEventDispatcher();
	const pokemonKeys: PokemonKey[] = pokemon;

	const firstRow: PokemonKey[] = pokemonKeys.slice(0, pokemonKeys.length / 2 - 1);
	const secondRow: PokemonKey[] = pokemonKeys.slice(pokemonKeys.length / 2 - 1, pokemon.length - 4);
	const thirdRow: PokemonKey[] = pokemonKeys.slice(pokemon.length - 4, pokemon.length);

	const handleKeyboard = ({ key }: { key: string }) => {
		const keys = {
			Backspace: () => dispatch('action', { action: 'backspace' }),
			Enter: () => dispatch('action', { action: 'enter' })
		};
		keys[key]?.call(this);
	};

	const handleSpecial = (event) => dispatch('action', { action: event.target.title });
	const handlePokemon = (event) => dispatch('pokemon', { pokemon: event.target.title });
</script>

<div
	class="pokelmon-keyboard"
	class:disable={$isWin || $isLost}
	use:handleKeyboardEvent
	on:keyboardPress={handleKeyboard}
>
	<div class="keyboard-row first">
		{#each firstRow as key}
			<Key id={key.id} type={key.type} name={key.pokemon.fr} on:click={handlePokemon} />
		{/each}
	</div>
	<div class="keyboard-row second">
		{#each secondRow as key}
			<Key id={key.id} type={key.type} name={key.pokemon.fr} on:click={handlePokemon} />
		{/each}
		<Key name="backspace" use="action" on:click={handleSpecial} />
	</div>
	<div class="keyboard-row third">
		<Key name="item" use="action" on:click={handleSpecial} />
		{#each thirdRow as key}
			<Key id={key.id} type={key.type} name={key.pokemon.fr} on:click={handlePokemon} />
		{/each}
		<Key name="enter" use="action" on:click={handleSpecial} />
	</div>
</div>

<style>
	.pokelmon-keyboard {
		width: 100%;
	}

	.disable {
		opacity: 0.8;
	}

	.keyboard-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
