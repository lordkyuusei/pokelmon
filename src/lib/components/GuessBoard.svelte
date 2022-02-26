<script lang="ts">
	import { browser, dev } from '$app/env';

	import Popup from './Popup.svelte';
	import { t } from '$lib/store/i18n';
	import { POKEMON_ICON_URL } from '$lib/constants';
	import { game, isLost, isWin, proposal } from '$lib/store/game';

	const mapGuessToIcon = {
		blank: '🔳',
		wrong: '🟥',
		correct: '🟩',
		misplaced: '🟧'
	};

	let clipboardStatus = $t('game-copy');
	let show: boolean = true;

	// write to clipboard
	const writeClipboard = async () => {
		if (browser) {
			const nbrTries = $game.filter((row) => row.every((cell) => cell.status !== 'blank')).length;
			const totalTries = $game.length;
			const header = `${$t('game-clipboard-header')} - ${nbrTries}/${totalTries}`;
			const tries = $game.map((row) => row.map((guess) => mapGuessToIcon[guess.status])).join('\n');
			await navigator.clipboard
				.writeText(header + '\n' + tries)
				.then(() => {
					clipboardStatus = $t('game-copy-success');
				})
				.catch(() => {
					clipboardStatus = $t('game-copy-failure');
				});
		}
	};
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

{#if $isWin || $isLost}
	<button on:click={() => (show = true)}>{$t('game-result-show')}</button>
	<Popup {show} close={() => (show = false)} size="lg">
		<div class:victory={$isWin} class:defeat={$isLost}>
			<h1>{$t(`game-${$isWin ? 'won' : 'lost'}`)}</h1>
			<div class="display-tries">
				{#each $game as row}
					<div class="try-square">
						{#each row as guess}
							<span>{mapGuessToIcon[guess.status]}</span>
						{/each}
					</div>
				{/each}
			</div>
			<button on:click={writeClipboard}>{clipboardStatus}</button>
		</div>
	</Popup>
{/if}

{#if dev}
	<div class="pokelmon-guessboard-debug">
		{#each $proposal as id}
			<img src="{POKEMON_ICON_URL}{id}.png" alt={`${id}`} />
		{/each}
	</div>
{/if}

<style>
	h1 {
		color: var(--theme-text);
	}

	button {
		margin: 0.5rem;
		border-radius: 25px;
		background-color: var(--theme-secondary);
		color: var(--theme-background);
		padding: 0.5rem;
		height: fit-content;
		width: fit-content;
	}

	.display-tries {
		width: 100%;
	}

	.try-square {
		font-size: x-large;
	}

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

	.victory,
	.defeat {
		padding: 0.5rem;
		width: 100%;
		height: 100%;
		color: var(--theme-background);
		border: 1px solid var(--theme-border);
		box-shadow: var(--theme-shadow);
		display: flex;
		flex-direction: column;
		align-content: center;
		align-items: center;
	}

	.victory {
		background-color: #477045;
	}

	.defeat {
		background-color: #ff9e9e;
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
