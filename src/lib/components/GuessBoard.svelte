<script lang="ts">
	import { browser, dev } from '$app/env';

	import { POKEMON_ICON_URL } from '$lib/constants';
	import { game, proposal } from '$lib/store/game';
	import ResultView from './ResultView.svelte';
</script>

<div class="pokelmon-guessboard">
	{#each $game as row, index}
		<div class="guessboard-row row-{index}">
			{#each row as cell}
				<div class="row-cell cell-{cell.status}">
					{#if cell.id !== 0}
						<img src="{POKEMON_ICON_URL}{cell.id}.png" alt={`${cell.id}`} title={`${cell.id}`} />
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
			<img src="{POKEMON_ICON_URL}{id}.png" alt={`${id}`} />
		{/each}
	</div>
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
		background-color: blueviolet;
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
	}

	.message {
		display: flex;
		margin-bottom: 3rem;
	}

	.row-0 {
		grid-row: 1;
	}

	.row-1 {
		grid-row: 2;
	}

	.row-2 {
		grid-row: 3;
	}

	.row-3 {
		grid-row: 4;
	}

	.row-4 {
		grid-row: 5;
	}

	.row-5 {
		grid-row: 6;
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
