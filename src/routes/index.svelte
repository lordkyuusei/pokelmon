<script context="module" lang="ts">
	export const load = async ({ params, fetch }) => {
		return {
			props: {
				seed: 1
			}
		};
	};
</script>

<script lang="ts">
	import { game, tries, proposal, isWin, isLost } from '$lib/store/game';
	import GuessBoard from '$lib/components/GuessBoard.svelte';
	import Keyboard from '$lib/components/Keyboard.svelte';
	import { onMount } from 'svelte';
	import { t } from '$lib/store/i18n';

	export let seed: number = 0;

	const handlePokemon = (event) => {
		const { pokemon } = event.detail;
		const id = parseInt(pokemon);
		game.write(id, $tries - 1);
	};

	const handleValidate = () => {
		if (!$isWin || !$isLost) {
			if ($game[$tries - 1].findIndex((p) => p.id === 0) === -1) {
				game.verify($tries - 1, $proposal);
				tries.increment();
			}
		}
	};

	const handleBackspace = () => game.backspace($tries - 1);

	const handleAction = (event) => {
		if (!$isWin || !$isLost) {
			const events = {
				backspace: () => handleBackspace(),
				enter: () => handleValidate()
			};
			const action = events[event.detail.action];
			action();
		}
	};

	onMount(() => {
		proposal.init(seed);
	});
</script>

<main>
	<h1>Pokélmon</h1>
	<h2>{$t('game-goal')}</h2>

	<GuessBoard />
	<Keyboard on:pokemon={handlePokemon} on:action={handleAction} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
		align-content: center;
		justify-content: center;
		background-color: var(--theme-alt-background);
	}

	h1,
	h2 {
		color: var(--theme-text);
		background-color: var(--theme-alt-background);
		text-align: center;
		font-family: 'Cascadia Code', monospace;
	}

	h1 {
		font-size: 3em;
		margin: 0 0 0 10px;
	}

	h2 {
		font-size: 1em;
	}
</style>
