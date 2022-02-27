<script lang="ts">
	import { browser, dev } from '$app/env';

	import { POKEMON_ICON_REL_URL } from '$lib/constants';
	import { game, proposal } from '$lib/store/game';
	import { createEventDispatcher } from 'svelte';
	import ResultView from './ResultView.svelte';

	const dispatch = createEventDispatcher();

	const solve = () => {
		$proposal.forEach((id) => dispatch('pokemon', { pokemon: id }));
	};
</script>

<div class="pokelmon-guessboard">
	{#each $game as row, index}
		<div class="guessboard-row row-{index}">
			{#each row as cell, index}
				<div class="row-cell cell-{index} cell-{cell.status}">
					{#if cell.id !== 0}
						<img
							src="{POKEMON_ICON_REL_URL}{cell.id}.png"
							alt={`${cell.id}`}
							title={`${cell.id}`}
						/>
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<ResultView />

{#if dev}
	<div class="pokelmon-guessboard-debug">
		{#each $proposal as id}
			<img src="{POKEMON_ICON_REL_URL}{id}.png" alt={`${id}`} />
		{/each}
	</div>
	<button on:click={solve}>Solve</button>
{/if}

<style>
	.pokelmon-guessboard {
		width: 100%;
		height: 100%;
		display: grid;
		grid-template-columns: 100%;
		grid-template-rows: repeat(6, 50px);
		align-items: center;
		justify-items: center;
		gap: 0.2rem;
		margin: 1rem auto;
	}

	.pokelmon-guessboard-debug {
		display: grid;
		height: 50px;
		grid-template-columns: repeat(6, 1fr);
		gap: 0.2rem;
		margin: 1rem auto;
		background-color: var(--theme-text);
		border-radius: 25px;
	}

	.pokelmon-guessboard-debug > img {
		margin-top: -10px;
	}

	img {
		image-rendering: pixelated;
		height: 60px;
		width: 70px;
		margin-top: -20px;
	}

	.guessboard-row {
		display: flex;
		justify-content: center;
		height: 100%;
		width: 100%;
		gap: 0.2rem;
	}

	.row-cell {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 3rem;
		width: 4rem;
		border: 1px solid var(--theme-border);
		border-radius: 10px;
		transition: background-color 0.5s ease;
	}

	.cell-0 {
		transition-delay: 0ms;
	}

	.cell-1 {
		transition-delay: 250ms;
	}

	.cell-2 {
		transition-delay: 500ms;
	}

	.cell-3 {
		transition-delay: 750ms;
	}

	.cell-4 {
		transition-delay: 1000ms;
	}

	.cell-5 {
		transition-delay: 1250ms;
	}

	.message {
		display: flex;
		margin-bottom: 3rem;
	}

	.cell-blank {
		background-color: var(--theme-text);
	}

	.cell-misplaced {
		background-color: rgb(255, 174, 0);
	}

	.cell-correct {
		background-color: rgb(0, 255, 179);
	}

	.cell-wrong {
		background-color: rgb(255, 0, 170);
	}

	@media screen and (max-width: 600px) {
		.pokelmon-guessboard {
			width: 90%;
		}

		img {
			image-rendering: pixelated;
			height: 100%;
			width: 50px;
			margin-top: -20px;
		}
	}
</style>
