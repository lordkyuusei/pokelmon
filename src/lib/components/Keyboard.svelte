<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Key from './Key.svelte';
	import pokemon from '$lib/store/alphabet.json';
	import type { PokemonKey } from '$lib/types/Types';

	const pokemonKeys: PokemonKey[] = pokemon;

	const firstRow: PokemonKey[] = pokemonKeys.slice(0, pokemonKeys.length / 2 - 1);
	const secondRow: PokemonKey[] = pokemonKeys.slice(pokemonKeys.length / 2 - 1, pokemon.length - 4);
	const thirdRow: PokemonKey[] = pokemonKeys.slice(pokemon.length - 4, pokemon.length);

	const dispatch = createEventDispatcher();

	const handlePokemon = (event) => dispatch('pokemon', { pokemon: event.target.title });
	const handleSpecial = (event) => dispatch('action', { action: event.target.title });
</script>

<div class="pokelmon-keyboard">
	<div class="keyboard-row first">
		{#each firstRow as key}
			<Key id={key.id} name={key.pokemon.fr} on:click={handlePokemon} />
		{/each}
	</div>
	<div class="keyboard-row second">
		{#each secondRow as key}
			<Key id={key.id} name={key.pokemon.fr} on:click={handlePokemon} />
		{/each}
		<Key name="backspace" use="action" on:click={handleSpecial} />
	</div>
	<div class="keyboard-row third">
		{#each thirdRow as key}
			<Key id={key.id} name={key.pokemon.fr} on:click={handlePokemon} />
		{/each}
		<Key name="enter" use="action" on:click={handleSpecial} />
	</div>
</div>

<style>
	.keyboard-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
